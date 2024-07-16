import React from 'react';
import Image from 'next/image';
import { ChatData } from '@/lib/constants/types/ChatData';

const ChatUserComponent = ({ data }: ChatData) => {
  return (
    <div className="flex p-2 gap-5 justify-between">
      <div className="flex gap-3 w-full">
        <Image
          className="rounded-full border-red-500 border-2"
          src="/slider1.svg"
          alt="Profile Pic"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <h1 className="font-semibold">John Doe</h1>
          <p className="text-gray-500">Last Text</p>
        </div>
      </div>
      <div className="text-gray-300">12:30p</div>
    </div>
  );
};

export default ChatUserComponent;
