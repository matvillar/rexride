import mongoose from 'mongoose';

export interface IReservation extends mongoose.Document {
  createdAt: Date;
  stripeId: string;
  totalAmount: number;
  ride: {
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    name: string;
  };
}
