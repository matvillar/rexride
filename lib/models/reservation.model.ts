import mongoose from 'mongoose';
import { IReservation } from '../constants/interfaces/IReservation';
import { ReservationItem } from '../constants/types/ReservationItem';

const reservationSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },

  totalAmount: { type: String },
  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ride',
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  seatsReserved: { type: Number, default: 1 },
});
const Reservation =
  mongoose.models.Reservation ||
  mongoose.model('Reservation', reservationSchema);

export default Reservation;
