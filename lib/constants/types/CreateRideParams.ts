import { UserTypeEnum } from '../enums/UserTypeEnum';

export type CreateRideParams = {
  userId: string;
  rideEvent: {
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
