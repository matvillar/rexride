import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getUserById } from '@/lib/actions/user.actions';
import { OtherProfilePageParams } from '@/lib/constants/types/OtherProfilePageParams';
import { MdOutlineRateReview } from 'react-icons/md';
import { averageRating, oneDecimalRating, toCapitalize } from '@/lib/utils';
import Image from 'next/image';
import { IoStarSharp } from 'react-icons/io5';
import React from 'react';
import { Star } from 'lucide-react';
import StarRating from '@/components/shared/StarRating';
import BarRating from '@/components/shared/BarRating';
import ReviewListings from '@/components/shared/ReviewListings';
import Link from 'next/link';
const sampleReviews = [
  { rating: 1 },
  { rating: 1 },
  { rating: 2 },
  { rating: 3 },
  { rating: 3 },
  { rating: 4 },
  { rating: 4 },
  { rating: 4 },
  { rating: 5 },
  { rating: 5 },
  { rating: 5 },
  { rating: 5 },
  { rating: 5 },
];

const page = async ({ params: { otherProfileId } }: OtherProfilePageParams) => {
  // This is a review profile page
  const getOtherProfile = await getUserById(otherProfileId);
  const aveRating = averageRating([5, 3]);
  const decimalRating = oneDecimalRating(aveRating);
  return (
    <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full 2xl:gap-0">
      <Card className="w-full lg:w-[90%] shadow-lg mt-10 mx-auto p-5">
        <div className="flex w-full lg:w-[85%] mx-auto flex-col gap-6">
          <div className="flex gap-5 py-5">
            <Image
              src={getOtherProfile?.userImage}
              alt="profile"
              width={200}
              height={200}
              className="rounded-lg shadow-lg"
            />
            <div className="flex flex-col gap-5">
              <h2 className="text-4xl font-bold">
                {toCapitalize(getOtherProfile?.name)}
              </h2>
              <p className="text-lg">{getOtherProfile?.email}</p>
              <Button>
                <Link href={`/profile/${otherProfileId}/review`}>
                  <MdOutlineRateReview size={24} />
                  Leave a Review
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-3xl font-bold py-4">Reviews</h2>
            <div className="flex ">
              <div className="flex flex-col">
                <h3 className="text-9xl font-bold">{decimalRating}.0</h3>
                {/* Stars rating */}
                <StarRating rating={aveRating} />
                <p className="text-xl text-gray-500">27 reviews</p>
              </div>
              <BarRating reviews={sampleReviews} />
            </div>
          </div>
          <ReviewListings />
        </div>
      </Card>
    </div>
  );
};

export default page;
