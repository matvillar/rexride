import { IRide } from '../interfaces/IRide';

export type CollectionParams = {
  data: IRide[];
  noRidesTitle: string;
  noRidesForSpecificLocation: string;
  collectionType?:
    | 'Rides_By_Location'
    | 'All_Rides'
    | 'User_Rides'
    | 'User_Bookings';
  limit: number;
  page: number | string;
  totalPage?: number;
  urlParamName?: string;
};
