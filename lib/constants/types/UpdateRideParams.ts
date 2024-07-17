import { UserTypeEnum } from '../enums/UserTypeEnum';
import { IRide } from '../interfaces/IRide';

export type UpdateRideParams = {
  userId: string;
  ride: {
    _id: string;
    rideType: UserTypeEnum;
    startTime: Date;
    pickupLocation: string;
    dropOffLocation: string;
    seatsAvailable: number;
    pricePerSeat: number;
    description?: string | undefined;
  };
  path: string;
};
