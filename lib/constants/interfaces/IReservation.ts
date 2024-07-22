import mongoose from 'mongoose';

export interface IReservation extends mongoose.Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: number;
  rideId: {
    _id: string;
    title: string;
  };
  buyerId: {
    _id: string;
    name: string;
  };
}

export interface IReservationItem {
  _id: string;
  createdAt: Date;
  totalAmount: string;
  rideTitle: string;
  buyer: string;
  rideId: string;
  seatsReserved: string;
}
