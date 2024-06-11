import mongoose from 'mongoose';
import { RideStatusEnum } from '../constants/enums/RideStatusEnum';
const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startTime: { type: Date, required: true },
  endTime: { type: Date },
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
  pickupLocation: { type: String, required: true },
  dropOffLocation: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Ride = mongoose.models.Ride || mongoose.model('Ride', rideSchema);
export default Ride;
