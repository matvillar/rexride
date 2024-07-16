import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  })
    .index('by_email', ['email'])
    .index('by_clerkId', ['clerkId']),

  requests: defineTable({
    sender: v.id('users'),
    receiver: v.id('users'),
  })
    .index('by_receiver', ['receiver'])
    .index('by_receiver_sender', ['receiver', 'sender']),

  friends: defineTable({
    user: v.id('users'),
    friend: v.id('users'),
    conversationId: v.id('conversations'),
  })
    .index('by_user', ['user'])
    .index('by_friend', ['friend'])
    .index('by_conversationId', ['conversationId']),

  conversations: defineTable({
    name: v.optional(v.string()),
    lastMessageId: v.optional(v.id('messages')),
  }),

  chatMembers: defineTable({
    memberId: v.id('users'),
    conversationId: v.id('conversations'),
    lastSeenMessageId: v.optional(v.id('messages')),
  })
    .index('by_memberId', ['memberId'])
    .index('by_conversationId', ['conversationId'])
    .index('by_member_conversation', ['memberId', 'conversationId']),

  messages: defineTable({
    senderId: v.id('users'),
    conversationId: v.id('conversations'),
    type: v.string(),
    content: v.array(v.string()),
  }).index('by_conversationId', ['conversationId']),
});
