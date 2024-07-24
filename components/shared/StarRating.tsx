import React from 'react';
import { IoStarSharp, IoStarOutline } from 'react-icons/io5';

type Props = {
  rating: number;
  maxRating?: number;
};

const StarRating = ({ rating, maxRating = 5 }: Props) => {
  const filledStars = Math.round(rating);
  const emptyStars = maxRating - filledStars;

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, index) => (
        <IoStarSharp key={index} size={24} className="text-yellow-500" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <IoStarOutline key={index} size={24} className="text-yellow-500" />
      ))}
    </div>
  );
};

export default StarRating;
