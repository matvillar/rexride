import { IRide } from '../interfaces/IRide';

export type RideFormParams = {
  userId: string;
  type: 'Create' | 'Update';
  rideId?: string;
  ride?: IRide;
};
