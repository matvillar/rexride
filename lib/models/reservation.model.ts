import { Schema, model, models, Document } from 'mongoose';

const reservationSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  stripeId: { type: String, required: true, unique: true },
  totalPayment: { type: String },
  ride: { type: Schema.Types.ObjectId, ref: 'Ride', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Reservation =
  models.Reservation || model('Reservation', reservationSchema);

export default Reservation;
