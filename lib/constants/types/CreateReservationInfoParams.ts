export type CreateReservationInfoParams = {
  rideId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
  seatsReserved: number;
  stripeId: string;
};
