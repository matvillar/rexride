import React from 'react';
import { SearchParams } from '@/lib/constants/types/SearchParams';
import { getRideById } from '@/lib/actions/ride.actions';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa';
import {
  toCapitalize,
  formatDateFromIso,
  formatTimeFromIso,
} from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import { RiMessage2Fill } from 'react-icons/ri';
import { IoCalendarSharp } from 'react-icons/io5';
import Link from 'next/link';
import DeleteModal from '@/components/shared/DeleteModal';
import ReserveSeatBtn from '@/components/shared/ReserveSeatBtn';

const RideDetails = async ({ params: { id } }: SearchParams) => {
  const ride = await getRideById(id);
  const { sessionClaims } = auth();
  const currSessionUserId = sessionClaims?.userId as string;

  if (!ride) {
    return (
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] text-center sm:text-left">
        Ride Not Found
      </div>
    );
  }

  return (
    <>
      <h3 className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] text-center sm:text-left">
        Ride Details
      </h3>
      <section className="flex justify-center m-5">
        {ride ? (
          <div className="grid grid-cols-1 m-1 md:grid-cols-2 2xl:max-w-7xl bg-gray-200 rounded-xl shadow-xl">
            <Image
              src="/driverRide.svg"
              alt="Ride Image"
              width={1000}
              height={1000}
              className="h-full min-h-[300px] object-cover object-center"
            />
            <div className="flex flex-col gap-5 mx-5 p-5 border-4 border-black rounded-xl lg:m-5">
              <div className="flex p-5 justify-between">
                <div className="flex mb-5">
                  <Image
                    className="rounded-full border-4 border-black"
                    src={ride.userId.userImage}
                    alt="User profilePic"
                    width={60}
                    height={60}
                  />
                  <h2 className="flex items-center pl-5 font-bold text-xl">
                    {toCapitalize(ride.userId.name)} |
                    <span className="text-red-500 ml-1">
                      {toCapitalize(ride.rideType)}
                    </span>
                  </h2>
                </div>
                {currSessionUserId === ride.userId._id ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="hover:bg-transparent hover:text-blue-500"
                    >
                      <Link href={`/rides/${ride._id}/update`}>
                        <FaEdit size={24} />
                      </Link>
                    </Button>
                    <div>
                      <DeleteModal rideId={ride._id} />
                    </div>
                  </div>
                ) : (
                  <Button className="hover:bg-transparent hover:text-blue-500">
                    <Link href={`/messages/${ride.userId._id}`}>
                      <RiMessage2Fill size={24} />
                    </Link>
                  </Button>
                )}
              </div>
              <div className="flex flex-col items-start px-10">
                <div className="flex items-center">
                  <FaCircle className="text-black" />
                  <div className="flex flex-col items-start ml-5">
                    <p className="text-gray-500 text-sm">Start Location</p>
                    <p className="mr-2 font-semibold">{ride.pickupLocation}</p>
                  </div>
                </div>
                <div
                  className="flex-grow border-l-4 border-dotted border-black m-2"
                  style={{ height: '100px' }}
                ></div>
                <div className="flex">
                  <IoLocation size={24} className="text-black mt-2" />
                  <div className="flex flex-col items-start ml-5">
                    <p className="text-gray-500 text-sm">Your Destination</p>
                    <p className="mr-2 font-semibold">{ride.dropOffLocation}</p>
                  </div>
                </div>
              </div>
              <div className="flex px-5 pt-5">
                <IoCalendarSharp size={24} className="mr-2" />
                <p className="text-gray-500 mr-1">Date</p>
                <p className="ml-2 font-semibold">
                  {formatDateFromIso(ride.startTime)}
                </p>
                <p className="text-gray-500 ml-5 mr-1">Time</p>
                <p className="ml-2 font-semibold">
                  {formatTimeFromIso(ride.startTime)}
                </p>
              </div>
              <div className="flex px-5 pt-5">
                <FaArrowRight size={24} className="mr-2" />
                <p className="text-gray-500 mr-1">Seats Available</p>
                <p className="ml-2 bg-black text-white px-3 rounded-lg font-semibold">
                  {ride.seatsAvailable}
                </p>
                <p className="text-gray-500 ml-5 mr-1">Price Per Seat</p>
                <p className="ml-2 font-semibold">$ {ride.pricePerSeat}</p>
              </div>
              {currSessionUserId !== ride.userId._id && (
                <ReserveSeatBtn ride={ride} />
              )}
            </div>
          </div>
        ) : (
          <div>Ride Not Found</div>
        )}
      </section>
    </>
  );
};

export default RideDetails;
