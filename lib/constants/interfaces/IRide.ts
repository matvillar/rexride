import { Document, Types } from 'mongoose';
import { RideStatusEnum } from '../enums/RideStatusEnum';

export interface IRide extends Document {
  _id: string;
  userId: { _id: string; name: string; userImage: string };
  passengers: { _id: string; name: string; userImage: string }[];
  rideType: string;
  startTime: Date;
  endTime?: Date;
  status: RideStatusEnum;
  seatsAvailable: number;
  pricePerSeat: number;
  pickupLocation: string;
  dropOffLocation: string;
  createdAt: Date;
}
