import RideForm from '@/components/forms/RideForm';
import { auth } from '@clerk/nextjs/server';

import React from 'react';

const CreateRide = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className=" py-5 md:py-10">
        <h3 className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] text-center sm:text-left">
          Create Ride Event
        </h3>
      </section>
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 my-8">
        <RideForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateRide;
