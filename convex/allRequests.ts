import { ConvexError } from 'convex/values';
import { query } from './_generated/server';
import { getUserByClerkId } from './_utils';

export const getAllRequests = query({
  args: {},
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      console.error('User not authenticated');
      throw new ConvexError('User not authenticated');
    }
    console.log('User identity:', userIdentity);

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: userIdentity.subject,
    });
    if (!currentUser) {
      console.error('User not found');
      throw new ConvexError('User not found');
    }
    console.log('Current user:', currentUser);

    const requests = await ctx.db
      .query('requests')
      .withIndex('by_receiver', (q) => q.eq('receiver', currentUser._id))
      .collect();
    console.log('Requests:', requests);

    const senderDetails = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.sender);
        if (!sender) {
          console.error('Sender not found for request:', request);
          throw new ConvexError('Sender not found');
        }
        return { request, sender };
      })
    );
    console.log('Sender details:', senderDetails);

    return senderDetails;
  },
});

export const reqCount = query({
  args: {},
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      console.error('User not authenticated');
      throw new ConvexError('User not authenticated');
    }
    console.log('User identity:', userIdentity);

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: userIdentity.subject,
    });
    if (!currentUser) {
      console.error('User not found');
      throw new ConvexError('User not found');
    }
    console.log('Current user:', currentUser);

    const requests = await ctx.db
      .query('requests')
      .withIndex('by_receiver', (q) => q.eq('receiver', currentUser._id))
      .collect();
    console.log('Requests:', requests);

    return requests.length;
  },
});
