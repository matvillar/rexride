import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import { get } from 'http';
import { getUserByClerkId } from './_utils';

export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    console.log(userIdentity);

    if (!userIdentity) {
      throw new ConvexError('User not authenticated');
    }
    if (args.email === userIdentity.email) {
      throw new ConvexError('Cannot send a request to yourself');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: userIdentity.subject,
    });
    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const receiver = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();

    if (!receiver) {
      throw new ConvexError('Receiver not found');
    }

    const requestAlreadySent = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', (q) =>
        q.eq('receiver', receiver._id).eq('sender', currentUser._id)
      )
      .unique();

    if (requestAlreadySent) {
      throw new ConvexError('Request already sent');
    }

    const requestAlreadyReceived = await ctx.db
      .query('requests')
      .withIndex('by_receiver_sender', (q) =>
        q.eq('receiver', currentUser._id).eq('sender', receiver._id)
      )
      .unique();

    if (requestAlreadyReceived) {
      throw new ConvexError('Request already received');
    }

    const friends1 = await ctx.db
      .query('friends')
      .withIndex('by_user', (q) => q.eq('user', currentUser._id))
      .collect();

    const friends2 = await ctx.db
      .query('friends')
      .withIndex('by_friend', (q) => q.eq('friend', currentUser._id))
      .collect();

    if (
      friends1.some((f) => f.friend === receiver._id) ||
      friends2.some((f) => f.user === receiver._id)
    ) {
      throw new ConvexError('Already friends');
    }

    const request = await ctx.db.insert('requests', {
      sender: currentUser._id,
      receiver: receiver._id,
    });

    return request;
  },
});

export const denyRequest = mutation({
  args: {
    requestId: v.id('requests'),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new ConvexError('User not authenticated');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: userIdentity.subject,
    });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const request = await ctx.db.get(args.requestId);

    if (!request) {
      throw new ConvexError('Request not found');
    }

    if (request.receiver !== currentUser._id) {
      throw new ConvexError('User not authorized');
    }

    await ctx.db.delete(request._id);
  },
});

export const acceptRequest = mutation({
  args: {
    requestId: v.id('requests'),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new ConvexError('User not authenticated');
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: userIdentity.subject,
    });

    if (!currentUser) {
      throw new ConvexError('User not found');
    }

    const request = await ctx.db.get(args.requestId);

    if (!request) {
      throw new ConvexError('Request not found');
    }

    if (request.receiver !== currentUser._id) {
      throw new ConvexError('User not authorized');
    }

    const conversationId = await ctx.db.insert('conversations', {});
    await ctx.db.insert('friends', {
      user: currentUser._id,
      friend: request.sender,
      conversationId,
    });
    await ctx.db.insert('chatMembers', {
      memberId: currentUser._id,
      conversationId,
    });

    await ctx.db.insert('chatMembers', {
      memberId: request.sender,
      conversationId,
    });

    await ctx.db.delete(request._id);
  },
});
