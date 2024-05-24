import Image from 'next/image';
import TopBar from '../components/shared/TopBar';
import HomeSlides from '../components/shared/HomeSlides';
import SearchRide from '../components/shared/SearchRide';
import SuggestedRides from '../components/shared/SuggestedRides';
import Footer from '../components/shared/Footer';

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <section className="mx-auto py-5">
        <div className="flex flex-col w-full mt-5 mb-30 lg:flex-row-reverse gap-10 lg:mt-11">
          <HomeSlides />
          <SearchRide />
        </div>
        <SuggestedRides />
      </section>
    </main>
  );
}
