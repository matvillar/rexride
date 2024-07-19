'use server';

import { redirect } from 'next/navigation';
import { CheckoutOrderParams } from '../constants/types/CheckoutOrderParams';
import Stripe from 'stripe';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const pricePerSeat = Number(order.price) * 100;
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: pricePerSeat,
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
    redirect(session.url!);
  } catch (err) {
    throw err;
  }
};
