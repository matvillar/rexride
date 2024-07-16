import { ConvexError, v } from 'convex/values';
import { query } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const getMessages = query({
  args: {
    id: v.id('conversations'),
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

    const isChatMember = await ctx.db
      .query('chatMembers')
      .withIndex('by_member_conversation', (q) =>
        q.eq('memberId', currentUser._id).eq('conversationId', args.id)
      )
      .unique();

    if (!isChatMember) {
      throw new ConvexError('User not a member of this chat');
    }

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.id))
      .order('desc')
      .collect();

    const userSenderMessages = await Promise.all(
      messages.map(async (message) => {
        const userSender = await ctx.db.get(message.senderId);
        if (!userSender) {
          throw new ConvexError('Sender not found');
        }

        return {
          message,
          senderImage: userSender.imageUrl,
          senderName: userSender.username,
          isCurrentUser: userSender._id === currentUser._id,
        };
      })
    );

    return userSenderMessages;
  },
});
