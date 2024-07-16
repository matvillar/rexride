import { ConvexError } from 'convex/values';
import { query } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const getAllRequests = query({
  args: {},
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
    // get all requests where the receiver is the current user
    const requests = await ctx.db
      .query('requests')
      .withIndex('by_receiver', (q) => q.eq('receiver', currentUser._id))
      .collect();

    const senderDetails = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.sender);

        if (!sender) {
          throw new ConvexError('Sender not found');
        }

        return { request, sender };
      })
    );

    return senderDetails;
  },
});

export const reqCount = query({
  args: {},
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

    const requests = await ctx.db
      .query('requests')
      .withIndex('by_receiver', (q) => q.eq('receiver', currentUser._id))
      .collect();

    return requests.length;
  },
});
