import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const createMessage = mutation({
  args: {
    conversationId: v.id('conversations'),
    type: v.string(),
    content: v.array(v.string()),
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
        q
          .eq('memberId', currentUser._id)
          .eq('conversationId', args.conversationId)
      )
      .unique();

    if (!isChatMember) {
      throw new ConvexError('User not a member of this chat');
    }

    const message = await ctx.db.insert('messages', {
      senderId: currentUser._id,
      ...args,
    });

    // update chatMembers lastMessage
    await ctx.db.patch(args.conversationId, {
      lastMessageId: message,
    });

    return message;
  },
});
