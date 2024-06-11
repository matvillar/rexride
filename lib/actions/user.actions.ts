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

export async function fetchUserInfo(userId: string) {
  connect();
  try {
    const user = await User.findOne({ id: userId });
    return user;
  } catch (err) {
    console.error('Error fetching user info: ', err);
  }
}
