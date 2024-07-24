import mongoose from 'mongoose';
import { RideStatusEnum } from '../constants/enums/RideStatusEnum';
import { UserTypeEnum } from '../constants/enums/UserTypeEnum';
const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startTime: { type: Date, required: true },
  rideType: {
    type: String,
    enum: [UserTypeEnum.DRIVER, UserTypeEnum.PASSENGER],
    required: true,
  },
  status: {
    type: String,
    enum: [
      RideStatusEnum.SCHEDULED,
      RideStatusEnum.IN_PROGRESS,
      RideStatusEnum.COMPLETED,
      RideStatusEnum.CANCELLED,
    ],
    required: true,
  },
  seatsAvailable: { type: Number, required: true },
  pricePerSeat: { type: Number, required: true },
  pickupLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  dropOffLocation: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Ride = mongoose.models.Ride || mongoose.model('Ride', rideSchema);
export default Ride;
