import { UserTypeEnum } from '../enums/UserTypeEnum';
export const RideDefaultValues = {
  rideType: UserTypeEnum.DRIVER,
  startTime: new Date(),
  pickupLocation: '',
  dropOffLocation: '',
  seatsAvailable: 1,
  pricePerSeat: 1,
  description: '',
};
