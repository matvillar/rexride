'use server';

import { redirect } from 'next/navigation';
import { CheckoutReservationParams } from '../constants/types/CheckoutReservationParams';
import Stripe from 'stripe';
import { handleError } from '../utils';
import { CreateReservationInfoParams } from '../constants/types/CreateReservationInfoParams';
import { connect } from '../mongoose';
import Reservation from '../models/reservation.model';

export const checkoutOrder = async (order: CheckoutReservationParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.price * 100;
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.rideTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        rideId: order.rideId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    // redirect
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createReservation = async (order: CreateReservationInfoParams) => {
  try {
    await connect();
    const newReservation = await Reservation.create({
      ...order,
      ride: order.rideId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newReservation));
  } catch (error) {
    throw error;
  }
};
