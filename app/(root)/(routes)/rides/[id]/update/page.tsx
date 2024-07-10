import RideForm from '@/components/forms/RideForm';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const UpdateRide = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="bg-red-50 bg-cover py-5 md:py-10">
        <h3 className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] text-center sm:text-left">
          Update Ride
        </h3>
      </section>
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 my-8">
        <RideForm userId={userId} type="Update" />
      </div>
    </>
  );
};

export default UpdateRide;
