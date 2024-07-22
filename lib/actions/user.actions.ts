'use server';

import { connect } from '../mongoose';
import User from '../models/user.model';
import { UpdateUserParams } from '../constants/types/UpdateUserParams';
import { CreateUserParams } from '../constants/types/CreateUserParams';
import { handleError } from '../utils';

export async function createUser(user: CreateUserParams) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    handleError(err);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connect();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser)
      throw new Error('Something went wrong while updating user');
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (err) {
    handleError(err);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connect();
    const deletedUser = await User.findOneAndDelete({ clerkId });
    if (!deletedUser)
      throw new Error('Something went wrong while deleting user');
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (err) {
    handleError(err);
  }
}

export async function getUserById(userId: string) {
  try {
    await connect();

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function fetchUserInfo(userId: string) {
  await connect();
  try {
    const user = await User.findById({ id: userId });
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.error('Error fetching user info: ', err);
  }
}
