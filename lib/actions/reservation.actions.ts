'use server';

import { CreateReservationInfoParams } from '../constants/types/CreateReservationInfoParams';
import Reservation from '../models/reservation.model';
import { handleError } from '../utils';
import { connect } from '../mongoose';
import User from '../models/user.model';
import { CheckoutReservationParams } from '../constants/types/CheckoutReservationParams';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';

import { GetReservationByUserParams } from '../constants/types/GetReservationByUserParams';
import Ride from '../models/ride.model';
import path from 'path';

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
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

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

    const newReservation = await Reservation.create({
      stripeId: reservation.stripeId,
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

// Get all reservations in a ride
// export const getReservationsByRide = async (rideId: string) => {
//   try {
//     await connect();
//     const rideObjectId = new ObjectId(rideId);
//     const reservations = await Reservation.find({
//       rideId: rideObjectId,
//     }).populate('buyerId');
//     return JSON.parse(JSON.stringify(reservations));
//   } catch (error) {
//     handleError(error);
//   }
// };

// // Get reservation by ride
export const getReservationsByRide = async ({
  searchString,
  rideId,
}: {
  searchString: string;
  rideId: string;
}) => {
  try {
    await connect();

    if (!rideId) throw new Error('Ride ID is required');
    const rideObjectId = new ObjectId(rideId);

    const reservations = await Reservation.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyerId',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'rides',
          localField: 'rideId',
          foreignField: '_id',
          as: 'ride',
        },
      },
      {
        $unwind: '$ride',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          seatsReserved: 1,
          createdAt: 1,
          rideTitle: '$ride.pickupLocation',
          rideId: '$ride._id',
          buyer: {
            name: '$buyer.name',
          },
        },
      },
      {
        $match: {
          rideId: rideObjectId,
          'buyer.name': { $regex: RegExp(searchString, 'i') },
        },
      },
    ]);

    return JSON.parse(JSON.stringify(reservations));
  } catch (error) {
    console.error('Error fetching reservations by ride:', error);
    throw error;
  }
};

export async function getReservationByUser({
  userId,
  limit = 3,
  page,
}: GetReservationByUserParams) {
  try {
    await connect();
    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyerId: userId };

    const reservations = await Reservation.distinct('ride._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'rideId',
        model: Ride,
        populate: {
          path: 'userId',
          model: User,
          select: '_id name email userImage',
        },
      });
    const reservationsCount =
      await Reservation.distinct('ride._id').countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(reservations)),
      totalPages: Math.ceil(reservationsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
