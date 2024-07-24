import { Document, Types } from 'mongoose';
import { RideStatusEnum } from '../enums/RideStatusEnum';

import { UserTypeEnum } from '../enums/UserTypeEnum';

export interface IRide extends Document {
  _id: string;
  userId: { _id: string; name: string; userImage: string };
  passengers: { _id: string; name: string; userImage: string }[];
  rideType: UserTypeEnum;
  startTime: Date;
  endTime?: Date;
  status: RideStatusEnum;
  seatsAvailable: number;
  pricePerSeat: number;
  pickupLocation: { _id: string; name: string };
  dropOffLocation: string;
  createdAt: Date;
}
