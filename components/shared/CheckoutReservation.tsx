'use client';
import { loadStripe } from '@stripe/stripe-js';
import { IRide } from '@/lib/constants/interfaces/IRide';
import { Button } from '../ui/button';
import { useEffect } from 'react';
import { checkoutOrder } from '@/lib/actions/reservation.actions';

type Props = {
  ride: IRide;
  userId: string;
};

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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

  const onCheckout = async () => {
    const order = {
      rideTitle: ride.pickupLocation,
      rideId: ride._id,
      price: ride.pricePerSeat,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg">
        Reserve Seat
      </Button>
    </form>
  );
};

export default CheckoutReservation;
