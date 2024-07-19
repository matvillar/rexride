import TopBar from '@/components/shared/TopBar';
import React from 'react';
import MyCard from '@/components/shared/MyCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IoMailOutline } from 'react-icons/io5';
import { IoChatboxEllipsesSharp } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { toCapitalize } from '@/lib/utils';
import Collection from '@/components/shared/Collection';
import {
  getRidesByUser,
  getRidesDataByRideId,
} from '@/lib/actions/ride.actions';
import SmallRideCard from '@/components/shared/SmallRideCard';
import { IRide } from '@/lib/constants/interfaces/IRide';
import MyRexRidesCard from '@/components/shared/MyRexRidesCard';
import { get } from 'http';

const Profile = async () => {
  const { sessionClaims } = auth();
  const currSessionUserId = sessionClaims?.userId as string;
  const user = await fetchUserInfo(currSessionUserId);

  const getRideByUser = await getRidesByUser({
    userId: currSessionUserId,
    limit: 6,
    page: 1,
  });

  const ridesData = await getRidesDataByRideId(user.rides);

  return (
    <>
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full items-center justify-center sm:justify-between">
        <MyCard>
          <div className="flex flex-col justify-center items-center">
            <Avatar>
              <AvatarImage src={user.userImage} />
              <AvatarFallback>NoPhoto</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-semibold mt-5">
              {toCapitalize(user.name)}
            </h1>
            <div className="flex text-center gap-10 mt-5">
              <div className="flex flex-col">
                <p className="text-lg">RexRides</p>
                <span className="font-semibold">10</span>
              </div>
              <div className="flex flex-col">
                <p className="text-lg">Rating</p>
                <span className="font-semibold">4.5/5</span>
              </div>
            </div>
          </div>
        </MyCard>
        <MyCard>
          <div className="flex justify-center items-center">
            <IoPhonePortraitOutline size={24} />
            <p className="ml-3">{user.phoneNumber || '(801) 554 - 4584'}</p>
            <IoMailOutline className="ml-3" size={24} />
            <p className="ml-3 underline">{user.email}</p>
            <IoChatboxEllipsesSharp
              className="ml-3 text-blue-600 hover:opacity-70 hover:scale-105 transition-all"
              size={28}
            />
          </div>
        </MyCard>
        <section className="flex flex-col bg-red-50 bg-cover bg-center p-5  md:py-10 mt-4 justify-between lg:flex">
          <div className="flex justify-between">
            <h2 className="font-bold text-3xl lg:text-left text-center px-5">
              My Rides
            </h2>
            <Button
              asChild
              className="hidden bg-red-500 lg:block rounded-full "
            >
              <Link href="/rides/create">Create Ride</Link>
            </Button>
          </div>
          <div className="flex gap-5 flex-col my-8 lg:flex-row">
            <Collection
              data={getRideByUser?.data}
              noRidesTitle="You have not created any rides yet!"
              noRidesForSpecificLocation="No Rides for this specific location, Come back later!"
              collectionType="User_Rides"
              limit={4}
              page={1}
              totalPage={2}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;

{
  /* {ridesData.map((ride: IRide) => {
              return (
                <>
                  <MyRexRidesCard data={ride} />
                </>
              );
            })} */
}
