import { CreateReviewParams } from '../constants/types/CreateReviewParams';
import Review from '../models/review.model';
import User from '../models/user.model';
import { handleError } from '../utils';

export const createReview = async ({
  userId,

  reviewedUserId,
  rating,
  comment,
}: CreateReviewParams) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const reviewedUser = await User.findById(reviewedUserId);
    if (!reviewedUser) throw new Error('User not found');

    const newReview = await Review.create({
      userId,
      reviewedUserId,
      rating,
      comment,
    });

    reviewedUser.reviews.push(newReview._id);
    await reviewedUser.save();

    return JSON.parse(JSON.stringify(newReview));
  } catch (error) {
    handleError(error);
  }
};
