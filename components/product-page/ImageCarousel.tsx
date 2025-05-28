'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel className="w-full max-w-full rounded-md overflow-hidden relative">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex items-center justify-center">
            <div className="relative w-full aspect-square">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-deepBlue text-white rounded-full p-2 hover:opacity-90 z-10" />
      <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-deepBlue text-white rounded-full p-2 hover:opacity-90 z-10" />
    </Carousel>
  );
}
