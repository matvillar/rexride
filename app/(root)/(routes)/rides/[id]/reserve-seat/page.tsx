import CheckoutReservation from '@/components/forms/CheckoutReservation';
import { getRideById } from '@/lib/actions/ride.actions';
import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { SearchParams } from '@/lib/constants/types/SearchParams';

const page = async ({ params: { id } }: SearchParams) => {
  const ride = await getRideById(id);
  const { sessionClaims } = auth();
  const currSessionUserId = sessionClaims?.userId as string;
  return (
    <div>
      <section className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full my-8 flex flex-col gap-8 rounded-lg">
        <CheckoutReservation />
      </section>
    </div>
  );
};

export default page;
