import Image from 'next/image';
import TopBar from '../../components/shared/TopBar';
import HomeSlides from '../../components/shared/HomeSlides';
import SearchRide from '../../components/shared/SearchRide';
import SuggestedRides from '../../components/shared/SuggestedRides';
import Footer from '../../components/shared/Footer';
import { auth } from '@clerk/nextjs/server';
import { SignedOut } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Collection from '@/components/shared/Collection';
import { getAllRides } from '@/lib/actions/ride.actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { SearchParams } from '@/lib/constants/types/SearchParams';

export default async function Home({ searchParams }: SearchParams) {
  // const { sessionClaims } = auth();
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const city = (searchParams?.query as string) || '';

  console.log('searchParams', searchParams.page);
  const rides = await getAllRides({
    query: searchText,
    limit: 6,
    page: page,
    city: city,
  });
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

      <div className="bg-red-100 w-full p-5 md:py-10">
        <section
          id="search-rides"
          className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full my-8 flex flex-col gap-8 rounded-lg "
        >
          <h2 className="font-bold text-[32px] p-5 leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
            Find Your Ride
          </h2>
          <SearchRide />
          <Collection
            data={rides?.data}
            noRidesTitle="No Rides Found"
            noRidesForSpecificLocation="No Rides for this specific location, Come back later!"
            collectionType="All_Rides"
            limit={4}
            page={1}
            totalPage={2}
          />
        </section>
      </div>
      <div className="md:py-20 flex flex-col max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full 2xl:gap-0">
        <h2 className="font-bold text-[32px] p-5 leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
          Frequent Questions Asked
        </h2>
        <div className="flex flex-col gap-8 bg-white w-full lg:flex-row p-5 rounded-lg shadow-lg">
          <div className="flex flex-shrink-0 items-center justify-center">
            <Image
              src="/driverR.jpg"
              alt="driver pic"
              width={500}
              height={500}
              className="rounded-lg "
            />
          </div>
          <Accordion type="single" collapsible className="w-full text-lg">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a new ride?</AccordionTrigger>
              <AccordionContent>
                To create a new ride, click on the "Create Ride" button, fill in
                the required details such as start time, pickup location,
                drop-off location, and other necessary information, then submit
                the form.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I search for rides?</AccordionTrigger>
              <AccordionContent>
                You can search for rides by entering the city name or other
                relevant keywords in the search bar. The results will filter
                automatically based on your query.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How do I join a ride as a passenger?
              </AccordionTrigger>
              <AccordionContent>
                To join a ride, browse the available rides, select the one that
                fits your schedule and route, and click on "Join Ride." Confirm
                your seat and you're all set.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What happens if a ride is canceled?
              </AccordionTrigger>
              <AccordionContent>
                If a ride is canceled, all passengers will be notified via email
                and the app. You will have the option to join another ride or
                create a new one.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Can I rate my ride experience?
              </AccordionTrigger>
              <AccordionContent>
                Yes, after completing a ride, you can rate your experience and
                provide feedback to help us improve the service.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                How do I update my ride details?
              </AccordionTrigger>
              <AccordionContent>
                To update your ride details, go to your rides, select the ride
                you want to edit, make the necessary changes, and save your
                updates.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>What are the payment options?</AccordionTrigger>
              <AccordionContent>
                Currently, we accept credit/debit cards and popular online
                payment methods. You can add your payment details in your
                account settings.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
