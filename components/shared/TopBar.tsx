import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import MyCard from './MyCard';
import BurgerMenu from './BurgerMenu';
import Link from 'next/link';
const TopBar = () => {
  return (
    <MyCard>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={60} height={60} />
          </Link>
          <h1 className="hidden text-2xl font-bold lg:block">
            Rex<span className="text-red-500">Ride</span>
          </h1>
        </div>
        <div className="flex gap-5">
          <Link href="/">
            <p className="hidden font-bold uppercase lg:block cursor-pointer hover:text-red-500 transition-all">
              Home
            </p>
          </Link>
          <Link href="/search-rides">
            <p className="hidden font-bold uppercase lg:block cursor-pointer hover:text-red-500 transition-all">
              Search Rides
            </p>
          </Link>
          <Link href="/messages">
            <p className="hidden font-bold uppercase lg:block cursor-pointer hover:text-red-500 transition-all">
              Messages
            </p>
          </Link>

          <Link href="/about-us">
            <p className="hidden font-bold uppercase lg:block cursor-pointer hover:text-red-500 transition-all">
              About Us
            </p>
          </Link>
        </div>
        <div className="flex gap-4">
          <p>
            Hi, <span>Name</span>!
          </p>
          <UserButton />
          <div className="lg:hidden">
            <BurgerMenu />
          </div>
        </div>
      </div>
    </MyCard>
  );
};

export default TopBar;
