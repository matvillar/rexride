import mongoose from 'mongoose';
import { IReservation } from '../constants/interfaces/IReservation';
import { ReservationItem } from '../constants/types/ReservationItem';

const reservationSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  stripeId: { type: String, required: true, unique: true },
  totalAmount: { type: String },
  ride: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
const Reservation =
  mongoose.models.Reservation ||
  mongoose.model('Reservation', reservationSchema);

export default Reservation;
