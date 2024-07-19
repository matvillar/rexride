import RideForm from '@/components/forms/RideForm';
import { getRideById } from '@/lib/actions/ride.actions';
import { UpdateRideProps } from '@/lib/constants/types/UpdateRideProps';

import { auth } from '@clerk/nextjs/server';
import React from 'react';

const UpdateRide = async ({ params: { id } }: UpdateRideProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const ride = await getRideById(id);

  return (
    <>
      <section className="bg-red-50 bg-cover py-5 md:py-10">
        <h3 className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] text-center sm:text-left">
          Update Ride
        </h3>
      </section>
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 my-8">
        <RideForm userId={userId} ride={ride} rideId={ride._id} type="Update" />
      </div>
    </>
  );
};

export default UpdateRide;
