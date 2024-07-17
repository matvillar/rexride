'use server';
import Ride from '../models/ride.model';
import { IRide } from '../constants/interfaces/IRide';
import { CreateRideParams } from '../constants/types/CreateRideParams';
import User from '../models/user.model';
import { RideStatusEnum } from '../constants/enums/RideStatusEnum';

import { connect } from '../mongoose';
import { handleError } from '../utils';
import { GetAllRidesParams } from '../constants/types/GetAllRidesParams';
import { DeleteRideProps } from '../constants/types/DeleteRideProps';
import { revalidatePath } from 'next/cache';
import { UpdateRideParams } from '../constants/types/UpdateRideParams';

const fillRideDetails = async (query: any) => {
  return query.populate({
    path: 'userId', // this path is a reference to the User model, it needs to exist in the Ride model
    model: User,
    select: '_id name email phone userImage',
  });
};

export const createRide = async ({
  userId,
  rideEvent,
  path,
}: CreateRideParams) => {
  try {
    await connect();
    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    const newRide = await Ride.create({
      ...rideEvent,
      status: RideStatusEnum.SCHEDULED,
      rideType: rideEvent.rideType,
      userId,
    });
    return JSON.parse(JSON.stringify(newRide));
  } catch (error) {
    handleError(error);
  }
};

export const updateRide = async ({ userId, ride, path }: UpdateRideParams) => {
  try {
    await connect();
    const rideToUpdate = await Ride.findById(ride._id);

    if (!rideToUpdate || rideToUpdate.userId.toHexString() !== userId) {
      throw new Error('Unauthorized or ride not found');
    }

    const updatedRide = await Ride.findByIdAndUpdate(
      ride._id,
      { ...ride, rideType: ride.rideType },
      { new: true }
    );

    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedRide));
  } catch (error) {
    handleError(error);
  }
};

export const getRideById = async (id: string) => {
  try {
    await connect();
    const ride = await fillRideDetails(Ride.findById(id));

    if (!ride) throw new Error('Ride not found');

    return JSON.parse(JSON.stringify(ride));
  } catch (error) {
    handleError(error);
  }
};

export const getAllRides = async ({
  query,
  limit = 4,
  page,
  city,
}: GetAllRidesParams) => {
  try {
    await connect();
    const conditions = {};
    const rideQuery = Ride.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(0)
      .limit(limit);
    const rides = await fillRideDetails(rideQuery);
    const totalRides = await Ride.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(rides)),
      totalPage: Math.ceil(totalRides / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteRideById = async ({ rideId, path }: DeleteRideProps) => {
  try {
    await connect();
    const deletedRide = await Ride.findByIdAndDelete(rideId);

    if (!deletedRide) {
      throw new Error(`Ride with ID ${rideId} not found`);
    }

    revalidatePath(path); // clear cache and refresh the page
    return { success: true };
  } catch (error) {
    handleError(error);
    return { success: false };
  }
};
