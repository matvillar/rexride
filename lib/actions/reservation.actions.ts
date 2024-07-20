'use server';

import { redirect } from 'next/navigation';
import { CheckoutReservationParams } from '@/lib/constants/types/CheckoutReservationParams';
import Stripe from 'stripe';
import { CreateReservationInfoParams } from '../constants/types/CreateReservationInfoParams';
import Reservation from '../models/reservation.model';
import { connect } from '../mongoose';
import { handleError } from '../utils';

export const checkoutReservation = async (
  reservation: CheckoutReservationParams
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const pricePerSeat = Number(reservation.price) * 100;
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: pricePerSeat,
            product_data: {
              name: reservation.rideTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        rideId: reservation.rideId,
        buyerId: reservation.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (err) {
    handleError(err);
  }
};

export const createReservationInfo = async (
  reservation: CreateReservationInfoParams
) => {
  try {
    await connect();

    const newReservation = await Reservation.create({
      ...reservation,
      ride: reservation.rideId,
      buyer: reservation.buyerId,
    });

    console.log('Getting new reservation', newReservation);

    return JSON.parse(JSON.stringify(newReservation));
  } catch (error) {
    handleError(error);
  }
};
