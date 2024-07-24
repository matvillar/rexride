import * as z from 'zod';

export const reviewValidation = z.object({
  userId: z.string(),
  reviewedUserId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string(),
});
