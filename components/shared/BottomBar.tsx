import Link from 'next/link';
import React from 'react';
import { IoHomeSharp } from 'react-icons/io5';
import Item from './Item';
import { FaUser } from 'react-icons/fa';

const BottomBar = () => {
  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-red-500 p-5  xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        <Link href="/home">
          <Item label="Home" icon={IoHomeSharp} />
        </Link>
        <div className="mt-4">
          <Link href="/profile">
            <Item label="Profile" icon={FaUser} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BottomBar;
