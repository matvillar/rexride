'use server';

import { CreateReservationInfoParams } from '../constants/types/CreateReservationInfoParams';
import Reservation from '../models/reservation.model';
import { handleError } from '../utils';
import { connect } from '../mongoose';
import User from '../models/user.model';
import { CheckoutReservationParams } from '../constants/types/CheckoutReservationParams';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

export const checkoutOrder = async (order: CheckoutReservationParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number(order.price * 100);
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: order.rideTitle,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        rideId: order.rideId,
        buyerId: order.buyerId,
      },

      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?canceled=true`,
    });
    console.log('session', session);
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createReservation = async (
  reservation: CreateReservationInfoParams
) => {
  try {
    await connect();
    // const rideOwner = await User.findById(reservation);
    const newReservation = await Reservation.create({
      rideId: reservation.rideId,
      buyerId: reservation.buyerId,
      seatsReserved: reservation.seatsReserved,
      totalAmount: reservation.totalAmount,
      createdAt: reservation.createdAt,
    });
    return JSON.parse(JSON.stringify(newReservation));
  } catch (error) {
    handleError(error);
  }
};
