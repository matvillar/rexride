import { v } from 'convex/values';
import { internalMutation, internalQuery } from './_generated/server';

export const create = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Ensure clerkId is unique
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique();
    if (existingUser) {
      console.log(`User with clerkId ${args.clerkId} already exists`);
      return;
    }
    await ctx.db.insert('users', args);
  },
});

export const getByClerkId = internalQuery({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .unique();
  },
});
