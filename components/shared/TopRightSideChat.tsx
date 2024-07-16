import Link from 'next/link';
import React from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import Image from 'next/image';

type Props = {
  imageUrl?: string;
  name: string;
};

const TopRightSideChat = ({ imageUrl, name }: Props) => {
  return (
    <div className="bg-white border-gray-200 border-b-2 shadow-xl p-2">
      <div className="flex items-center justify-between">
        <Link href="/messages" className="block lg:hidden">
          <RiArrowLeftSLine />
        </Link>
        <Image
          src={imageUrl || '/avatar.svg'}
          alt={name}
          className="rounded-full"
          width={40}
          height={40}
        />

        <div className="flex flex-col">
          <p className="text-sm font-semibold">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default TopRightSideChat;
