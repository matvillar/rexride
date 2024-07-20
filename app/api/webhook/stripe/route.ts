import { createReservation } from '@/lib/actions/reservation.actions';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      throw err;
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const { id, amount_total, metadata } = event.data.object;

        const reservation = {
          stripeId: id,
          rideId: metadata?.rideId || '',
          buyerId: metadata?.buyerId || '',
          totalAmount: amount_total ? (amount_total / 100).toString() : '0',
          createdAt: new Date(),
        };
        const newOrder = await createReservation(reservation);
        return res.json({ message: 'OK', order: newOrder });

        // Process the reservation object as needed, for example, save it to your database
      }
      // Add more event handlers as needed
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}

// import stripe from 'stripe';
// import { NextResponse } from 'next/server';
// import { createReservation } from '@/lib/actions/reservation.actions';

// export async function POST(request: Request) {
//   const body = await request.text();

//   const sig = request.headers.get('stripe-signature') as string;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     return NextResponse.json({ message: 'Webhook error', error: err });
//   }

//   // Get the ID and type
//   const eventType = event.type;

//   // CREATE
//   if (eventType === 'checkout.session.completed') {
//     const { id, amount_total, metadata } = event.data.object;
//     console.log('metadata', metadata);

//     const order = {
//       stripeId: id,
//       rideId: metadata?.rideId || '',
//       buyerId: metadata?.buyerId || '',
//       totalAmount: amount_total ? (amount_total / 100).toString() : '0',
//       createdAt: new Date(),
//     };

//     const newOrder = await createReservation(order);
//     return NextResponse.json({ message: 'OK', order: newOrder });
//   }

//   return new Response('', { status: 200 });
// }
