import * as z from 'zod';

export const addChatValidation = z.object({
  email: z
    .string()
    .min(1, { message: "This Field can't be empty" })
    .email('Enter valid Email'),
});
