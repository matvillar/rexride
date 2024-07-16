import { ConvexError, v } from 'convex/values';
import { query } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const getConversation = query({
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

    const chat = await ctx.db.get(args.id);

    if (!chat) {
      throw new ConvexError('Chat not found');
    }

    const chatMembers = await ctx.db
      .query('chatMembers')
      .withIndex('by_member_conversation', (q) =>
        q.eq('memberId', currentUser._id).eq('conversationId', chat._id)
      )
      .unique();

    if (!chatMembers) {
      throw new ConvexError('Chat not found');
    }

    const allChatMembers = await ctx.db
      .query('chatMembers')
      .withIndex('by_conversationId', (q) => q.eq('conversationId', args.id))
      .collect();

    const otherMemberId = allChatMembers.filter(
      (member) => member.memberId !== currentUser._id
    )[0];

    const otherMemberDetails = await ctx.db.get(otherMemberId.memberId);

    return {
      ...chat,
      otherMember: {
        ...otherMemberDetails,
        lastSeenMessageId: otherMemberId.lastSeenMessageId,
      },
    };
  },
});
