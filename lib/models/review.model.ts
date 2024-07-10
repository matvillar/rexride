import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default Review;
