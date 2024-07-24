import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },

  stripeId: { type: String, required: true, unique: true },
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
