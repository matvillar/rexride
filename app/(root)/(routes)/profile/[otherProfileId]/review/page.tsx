'use client';
import ReviewForm from '@/components/forms/ReviewForm';
import { OtherProfilePageParams } from '@/lib/constants/types/OtherProfilePageParams';
import React from 'react';

const page = ({ params: { otherProfileId } }: OtherProfilePageParams) => {
  return (
    <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full 2xl:gap-0">
      {/* <ReviewForm otherUserId={otherProfileId} /> */}
    </div>
  );
};

export default page;
