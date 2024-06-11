import Image from 'next/image';
import TopBar from '../../components/shared/TopBar';
import HomeSlides from '../../components/shared/HomeSlides';
import SearchRide from '../../components/shared/SearchRide';
import SuggestedRides from '../../components/shared/SuggestedRides';
import Footer from '../../components/shared/Footer';
import { currentUser } from '@clerk/nextjs/server';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  // const user = currentUser();
  // if (!user) return null;

  // const userInfo = await fetchUserInfo(user.id);
  // if (!userInfo?.isOnboard) {
  //   redirect('/get-onboard');
  // }

  return (
    <>
      <section className="p-5 md:py-10">
        <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full grid grid-cols-1 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">
              Share the Ride, Share the Journey
            </h1>
            <p className="text-[20px] text-gray-500 leading-[30px] tracking-[2%]">
              Create and Book Rides, Connecting You to Every Destination
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full h-[50px] w-full bg-red-500 lg:w-fit hover:bg-red-600 transition-colors duration-300 ease-in-out text-white font-semibold text-lg"
            >
              <Link href="#search-rides" className="font-semibold text-lg">
                Find Rides
              </Link>
            </Button>
          </div>
          <HomeSlides />
        </div>
      </section>

      <section
        id="search-rides"
        className="bg-red-50 max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full my-8 flex flex-col gap-8"
      >
        <h2 className=" font-bold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
          Find Your Ride
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row"></div>
      </section>
    </>
  );
}

{
  /* <main className="w-full flex flex-col">
<section className="mx-auto py-5">
  <div className="flex flex-col w-full mt-5 mb-30 lg:flex-row-reverse gap-10 lg:mt-11">
    <HomeSlides />
    <SearchRide />
  </div>
  <SuggestedRides />
</section>
</main> */
}
