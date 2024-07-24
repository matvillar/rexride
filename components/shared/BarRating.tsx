import React from 'react';

interface Review {
  rating: number;
}

interface BarRatingProps {
  reviews: Review[];
}

const BarRating: React.FC<BarRatingProps> = ({ reviews }) => {
  // Calculate rating counts
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[Math.round(review.rating) - 1]++;
    }
  });

  // Calculate total reviews
  const totalReviews = reviews.length;

  // Calculate percentage for each rating level
  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews ? (count / totalReviews) * 100 : 0
  );

  return (
    <div className="flex w-full flex-col ml-8">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex  items-center mb-2">
          <span className="text-xl font-bold">{5 - index}</span>
          <div
            className="relative w-full h-4 bg-gray-200 ml-2 rounded-lg"
            style={{ width: '200px' }}
          >
            <div
              className="absolute top-0 left-0 h-full bg-yellow-500 rounded-lg"
              style={{ width: `${ratingPercentages[index]}%` }}
            ></div>
          </div>
          <span className="ml-2">{ratingPercentages[index].toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

export default BarRating;
