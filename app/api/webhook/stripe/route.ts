import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';
import { createReservation } from '@/lib/actions/reservation.actions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get('stripe-signature')!;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'Webhook Error', error });
  }

  if (event.type === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      rideId: metadata?.rideId || '',
      buyerId: metadata?.buyerId || '',
      seatsReserved: 1,
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
      stripeId: id,
    };

    const newReservation = await createReservation(order);

    return NextResponse.json({ message: 'Ok', order: newReservation });
  }

  return new Response('', { status: 200 });
}
