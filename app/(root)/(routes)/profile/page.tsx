import TopBar from '@/components/shared/TopBar';
import React from 'react';
import MyCard from '@/components/shared/MyCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { IoMailOutline } from 'react-icons/io5';
import { IoChatboxEllipsesSharp } from 'react-icons/io5';

const Profile = () => {
  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center mx-auto p-5">
        <MyCard>
          <div className="flex flex-col justify-center items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-semibold mt-5">Matias Villar</h1>
            <div className="flex text-center gap-10 mt-5">
              <div className="flex flex-col">
                <p className="text-lg">Rex Rides</p>
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
            <p className="ml-3">+54 9 11 1234 5678</p>
            <IoMailOutline className="ml-3" size={24} />
            <p className="ml-3 underline">mevillar@byu.edu</p>
            <IoChatboxEllipsesSharp
              className="ml-3 text-blue-600 hover:opacity-70 hover:scale-105 transition-all"
              size={28}
            />
          </div>
        </MyCard>
      </div>
    </>
  );
};

export default Profile;
