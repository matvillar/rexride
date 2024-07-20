'use client';
import { IRide } from '@/lib/constants/interfaces/IRide';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutReservation } from '@/lib/actions/reservation.actions';

// Initialize Stripe outside of a component’s render to avoid recreating the instance on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  ride: IRide;
  userId: string;
};

const CheckoutReservation = ({ ride, userId }: Props) => {
  useEffect(() => {
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

    // Create checkout session and get the session URL
    const sessionUrl = await checkoutReservation(reservation);

    // If session URL exists, use Stripe to redirect to the checkout page
    if (sessionUrl) {
      const stripe = await stripePromise;
      stripe?.redirectToCheckout({ sessionId: sessionUrl });
    }
  };

  return (
    <Button
      type="button"
      onClick={onCheckOut}
      role="link"
      size="lg"
      className="rounded-full w-fit"
    >
      Reserve Seat
    </Button>
  );
};

export default CheckoutReservation;
