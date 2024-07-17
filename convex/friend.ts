import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const removeFriend = mutation({
  args: {
    conversationId: v.id('conversations'),
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

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new ConvexError('Conversation not found');
    }

    const chatMembers = await ctx.db
      .query('chatMembers')
      .withIndex('by_conversationId', (q) =>
        q.eq('conversationId', args.conversationId)
      )
      .collect();
    if (!chatMembers || chatMembers.length !== 2) {
      throw new ConvexError('This chat does not have any members');
    }

    const friendship = await ctx.db
      .query('friends')
      .withIndex('by_conversationId', (q) =>
        q.eq('conversationId', args.conversationId)
      )
      .unique();
    if (!friendship) {
      throw new ConvexError('Friendship not found');
    }

    const messages = await ctx.db
      .query('messages')
      .withIndex('by_conversationId', (q) =>
        q.eq('conversationId', args.conversationId)
      )
      .collect();

    try {
      // Deleting the conversation
      await ctx.db.delete(args.conversationId);

      // Deleting the friendship
      await ctx.db.delete(friendship._id);

      // Deleting chat members
      await Promise.all(
        chatMembers.map(async (member) => {
          await ctx.db.delete(member._id);
        })
      );

      // Deleting messages
      await Promise.all(
        messages.map(async (message) => {
          await ctx.db.delete(message._id);
        })
      );

      console.log(
        'Deletion successful for conversation, friendship, chat members, and messages.'
      );
    } catch (error) {
      console.error('Error during deletion:', error);
      throw new ConvexError('Error during deletion process');
    }
  },
});
