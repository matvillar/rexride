'use client';
import { IRide } from '@/lib/constants/interfaces/IRide';
import React from 'react';
import { RideStatusEnum } from '@/lib/constants/enums/RideStatusEnum';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import CheckoutReservation from './CheckoutReservation';

type Props = {
  ride: IRide;
};

const ReserveSeatBtn = ({ ride }: Props) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasRideStarted = ride.status === RideStatusEnum.IN_PROGRESS;

  return (
    <div className="flex items-center justify-center gap-3">
      {hasRideStarted ? (
        <p className="p-2 text-red-500">
          Sorry but this ride has been Departed
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Sign In to Reserve Seat</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <CheckoutReservation ride={ride} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default ReserveSeatBtn;
