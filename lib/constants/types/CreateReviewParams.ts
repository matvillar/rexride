export type CreateReviewParams = {
  userId: string;

  reviewedUserId: string;
  rating: number;
  comment: string;
};
