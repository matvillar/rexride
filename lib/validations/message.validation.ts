import * as z from 'zod';

export const messageValidation = z.object({
  content: z.string().min(1, { message: 'Field cant be empty' }),
});
