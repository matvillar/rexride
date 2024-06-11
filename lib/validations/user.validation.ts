import * as z from 'zod';

export const userValidation = z.object({
  name: z.string().min(3).max(20),
  username: z.string().min(3).max(20),
  userImage: z.string().url(),
  phoneNumber: z.string().min(10).max(10).optional(),
});
