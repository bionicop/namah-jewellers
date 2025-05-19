'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const images = [
  '/jewellery_images/jewellery1.jpeg',
  '/jewellery_images/jewellery2.jpeg',
  '/jewellery_images/jewellery3.jpeg',
];

export default function ImageCarousel() {
  return (
    <Carousel className="w-full max-w-full rounded-md overflow-hidden relative ">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="flex items-center justify-center ">
            <Image
              src={src}
              alt={`Jewellery ${index + 1}`}
              width={600}
              height={400}
              className="sm:size-7/12 md:size-9/12 lg:size-11/12 "
              priority={index === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-deepBlue text-white rounded-full p-2 hover:opacity-90 z-10" />
      <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-deepBlue text-white rounded-full p-2 hover:opacity-90 z-10" />
    </Carousel>
  );
}
