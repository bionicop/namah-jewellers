'use client';

import { useEffect, useState } from 'react';
import ImageCarousel from '@/components/product-page/ImageCarousel';
import AppointmentForm from '@/components/product-page/AppointmentForm';
import ProductFeatures from '@/components/product-page/ProductFeatures';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

const ProductDetails = ({ onBook }: { onBook: () => void }) => (
  <Card>
    <CardContent className="space-y-4 p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-deepBlue">Elegant Gold Necklace</h1>
      <p className="text-lg sm:text-xl text-gold">₹75,000</p>
      <p>Delivery in 7–10 business days</p>
      <div className="space-x-2 sm:space-x-4 gap-y-2 flex flex-wrap">
        <Button variant='outline' className="bg-gray-600 text-white hover:opacity-90 " onClick={onBook}>
          Book an Appointment
        </Button>
        <Button variant="outline">Product Inquiry</Button>
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam corrupti facere
          reprehenderit, nesciunt illum quod adipisci nihil ipsam eum ut...
        </p>
      ))}
    </CardContent>
  </Card>
);

const ExtraInfo = () => (
  <div className="space-y-4 text-sm sm:text-base">
    {Array.from({ length: 3 }).map((_, i) => (
      <p key={i}>...More scrollable details here about materials, reviews, etc.</p>
    ))}
  </div>
);

const ResizableView = ({ onBook }: { onBook: () => void }) => (
  <div className="h-screen w-full overflow-hidden bg-black text-black flex">
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={50}
        minSize={30}
        maxSize={70}
        className="max-h-screen flex items-center justify-center border-r-4 border-gold bg-white"
      >
        <ImageCarousel />
      </ResizablePanel>
      <ResizableHandle className="bg-gold" />
      <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
        <div className="h-full overflow-y-auto px-6 sm:px-8 py-8 space-y-6 bg-white">
          <ProductDetails onBook={onBook} />
          <ExtraInfo />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
);

const StackedView = ({ onBook }: { onBook: () => void }) => (
  <div className="w-full text-black flex flex-col space-y-6 p-4">
    <div className="w-full">
      <ImageCarousel />
    </div>
    <div className="w-full space-y-6">
      <ProductDetails onBook={onBook} />
      <ExtraInfo />
    </div>
  </div>
);

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

      type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4'
    const [activeItem, setActiveItem] = useState<ImageKey>('item-1')

    const images = {
        'item-1': {
            image: '/charts.png',
            alt: 'Database visualization',
        },
        'item-2': {
            image: '/music.png',
            alt: 'Security authentication',
        },
        'item-3': {
            image: '/mail2.png',
            alt: 'Identity management',
        },
        'item-4': {
            image: '/payments.png',
            alt: 'Analytics dashboard',
        },
    }

  return (
    <>
      {isMobile ? (
        <StackedView onBook={() => setOpen(true)} />
      ) : (
        <ResizableView onBook={() => setOpen(true)} />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className="w-300 p-2 overflow-hidden">
          <AppointmentForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductPage;
