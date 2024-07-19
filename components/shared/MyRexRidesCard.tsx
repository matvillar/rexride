import { IRide } from '@/lib/constants/interfaces/IRide';
import {
  formatDateFromIso,
  formatTimeFromIso,
  toCapitalize,
} from '@/lib/utils';
import React from 'react';

type Props = {
  data: IRide;
};

const MyRexRidesCard = ({ data }: Props) => {
  return (
    <li key={data._id} className="flex justify-center">
      <div className="group min-h-52 min-w-72 relative flex w-full flex-col overflow-hidden bg-white border-4 border-black rounded-lg p-4 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
        <div className="flex mb-3">
          <h2 className="flex items-center pl-5 font-bold text-lg">
            {toCapitalize(data.status)} |{' '}
            <span className="text-red-500 ml-1">
              {toCapitalize(data.rideType)}
            </span>
          </h2>
        </div>
        <div className="flex">
          <p className="mr-5 font-semibold"> {data.pickupLocation}</p>
          <div className="flex-grow border-t-4 border-spacing-x-4 border-black -mr-4 my-3"></div>
          {/* <IoIosArrowForward size={28} /> */}
          <p className="font-semibold"> {data.dropOffLocation}</p>
        </div>
        <div className="flex mt-3">
          <p className="text-gray-500 mr-1">Date</p>
          <p className="ml-2 font-semibold">
            {formatDateFromIso(data.startTime)}
          </p>

          <p className="text-gray-500 ml-5 mr-1">Time</p>
          <p className="ml-2 font-semibold">
            {formatTimeFromIso(data.startTime)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default MyRexRidesCard;
