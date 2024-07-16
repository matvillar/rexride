'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SignedIn, UserButton } from '@clerk/nextjs';
import MyCard from './MyCard';
import BurgerMenu from './BurgerMenu';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignedOut } from '@clerk/nextjs';
import { Button } from '../ui/button';
import NavItems from './NavItems';
import NotificationsDropDownMenu from './NotificationsDropDownMenu';

const TopBar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="w-full border-b bg-white shadow-md">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex items-center justify-between">
        <div className="w-36 flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.svg" alt="RexRide Logo" width={50} height={50} />
          </Link>
          <h1 className="hidden text-2xl font-bold lg:block">
            Rex<span className="text-red-500">Ride</span>
          </h1>
        </div>
        {isMounted && (
          <>
            <SignedIn>
              <nav className="md:flex-between hidden w-full max-w-xs lg:block">
                <NavItems />
              </nav>
            </SignedIn>
            <div className="flex w-32 justify-end gap-3">
              <SignedIn>
                <NotificationsDropDownMenu />
              </SignedIn>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
                <div className="lg:hidden">
                  <BurgerMenu />
                </div>
              </SignedIn>
              <SignedOut>
                <Button asChild className="rounded-full" size="lg">
                  <Link href="/sign-in">Log in</Link>
                </Button>
              </SignedOut>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;

// <MyCard>
// <div className="flex justify-between items-center">
//   <div className="flex gap-1 items-center">
//     <Link href="/">
//       <Image src="/logo.svg" alt="Logo" width={60} height={60} />
//     </Link>
//     <h1 className="hidden text-2xl font-bold lg:block">
//       Rex<span className="text-red-500">Ride</span>
//     </h1>
//   </div>

//   <div className="flex gap-4">
//     <p>
//       Hi, <span>Name</span>!
//     </p>
//     <UserButton />
//     <div className="lg:hidden">
//       <BurgerMenu />
//     </div>
//   </div>
// </div>
// </MyCard>
