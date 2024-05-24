'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

import Image from 'next/image';

const HomeSlides = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <Image src="/slide1.svg" alt="Slide 1" width={1200} height={600} />
        </CarouselItem>
        <CarouselItem>
          <Image src="/slide2.svg" alt="Slide 2" width={1200} height={600} />
        </CarouselItem>
        <CarouselItem>
          <Image src="/slide3.svg" alt="Slide 3" width={1200} height={600} />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default HomeSlides;
