'use client';
import { IRide } from '@/lib/constants/interfaces/IRide';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutReservation } from '@/lib/actions/reservation.actions';
import { CreateReservationInfoParams } from '@/lib/constants/types/CreateReservationInfoParams';

import { connect } from '@/lib/mongoose';
import { handleError } from '@/lib/utils';
import Reservation from '@/lib/models/reservation.model';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Props = {
  ride: IRide;
  userId: string;
};

const CheckoutReservation = ({ ride, userId }: Props) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  const onCheckOut = async () => {
    const reservation = {
      rideTitle: ride.userId.name,
      rideId: ride._id,
      price: ride.pricePerSeat,
      buyerId: userId,
    };

    await checkoutReservation(reservation);
  };
  return (
    <form action={onCheckOut} method="post">
      <Button
        type="submit"
        role="link"
        size="lg"
        className="rounded-full w-fit"
      >
        Reserve Seat
      </Button>
    </form>
  );
};

export default CheckoutReservation;
