import * as z from 'zod';
import { UserTypeEnum } from '../constants/enums/UserTypeEnum';
export const rideValidation = z.object({
  rideType: z.enum([UserTypeEnum.DRIVER, UserTypeEnum.PASSENGER]),
  startTime: z.date().refine((date) => date > new Date(), {
    message: 'Start time must be in the future',
  }),
  pickupLocation: z.string().min(3),
  dropOffLocation: z.string().min(3),
  seatsAvailable: z.number().int().positive(),
  pricePerSeat: z.number().int().positive(),
  description: z.string().min(10).optional(),
});
