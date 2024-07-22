import { IRide } from '../interfaces/IRide';
import { IUser } from '../interfaces/IUser';

export type CollectionParams = {
  data: IRide[];
  noRidesTitle: string;

  noRidesForSpecificLocation: string;
  collectionType?:
    | 'Rides_By_Location'
    | 'All_Rides'
    | 'User_Rides_Created'
    | 'User_Bookings_Made';
  limit: number;
  page: number | string;
  totalPage?: number;
  urlParamName?: string;
};
