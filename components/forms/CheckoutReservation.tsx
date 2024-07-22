'use client';
import { loadStripe } from '@stripe/stripe-js';
import { IRide } from '@/lib/constants/interfaces/IRide';
import { Button } from '../ui/button';
import { use, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { checkoutOrder } from '@/lib/actions/reservation.actions';

type Props = {
  ride: IRide;
  userId: string;
};

loadStripe(
  'pk_test_51PeJupRram48F1n8rWup51mBA5qxdNOyMxZSXWun9O0pQCbTk1BJzHYJriie2NYcs1UinkrvY9O2WaRw6Yi1kHgM00ej0dF3At'
);

// const form = useForm({});
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
    <form action={onCheckout} method="POST">
      <Button type="submit">Reserve Seat</Button>
    </form>
  );
};

export default CheckoutReservation;
