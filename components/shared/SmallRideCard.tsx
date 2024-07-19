import { IRide } from '@/lib/constants/interfaces/IRide';
import React from 'react';
import Image from 'next/image';
import {
  formatDateFromIso,
  formatTimeFromIso,
  toCapitalize,
} from '@/lib/utils';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { auth } from '@clerk/nextjs/server';

const SmallRideCard = ({ data }: any) => {
  const { sessionClaims } = auth();
  const currSessionUserId = sessionClaims?.userId as string;

  return (
    <>
      {data.map((ride: IRide) => {
        return (
          <li key={ride._id} className="flex justify-center">
            <div className="group min-h-52 min-w-72 relative flex w-full flex-col overflow-hidden bg-white border-4 border-black rounded-lg p-4 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="flex mb-3">
                <Image
                  className="rounded-full border-4 border-black"
                  src={ride.userId.userImage || '/driverRide.svg'}
                  alt="User Pic"
                  width={50}
                  height={50}
                />
                <h2 className="flex items-center pl-5 font-bold text-lg">
                  {toCapitalize(ride.userId.name)} |{' '}
                  <span className="text-red-500 ml-1">
                    {' '}
                    {toCapitalize(ride.rideType)}
                  </span>
                </h2>
              </div>
              <div className="flex">
                <p className="mr-5 font-semibold"> {ride.pickupLocation}</p>
                <div className="flex-grow border-t-4 border-spacing-x-4 border-black -mr-4 my-3"></div>
                <IoIosArrowForward size={28} />
                <p className="font-semibold"> {ride.dropOffLocation}</p>
              </div>
              <div className="flex mt-3">
                <p className="text-gray-500 mr-1">Date</p>
                <p className="ml-2 font-semibold">
                  {formatDateFromIso(ride.startTime)}
                </p>

                <p className="text-gray-500 ml-5 mr-1">Time</p>
                <p className="ml-2 font-semibold">
                  {formatTimeFromIso(ride.startTime)}
                </p>
              </div>
              <div className="flex justify-center p-2">
                <Button
                  asChild
                  size="lg"
                  className="flex w-full rounded-full  items-center  bg-red-500 lg:w-fit hover:bg-red-600 transition-colors duration-300 ease-in-out text-white font-semibold text-lg"
                >
                  <Link
                    href={`/rides/${ride._id}`}
                    className="font-semibold text-lg"
                  >
                    Check Ride
                  </Link>
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default SmallRideCard;
