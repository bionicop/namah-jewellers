'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { DatePickerDemo } from '@/components/ui/datePicker';
import { DialogClose } from '@/components/ui/dialog';
import { DateTimePicker } from '../ui/dateTimePicker';
import { Calendar } from '../ui/calendar';

const AppointmentForm = () => {

  return (
    <div className="flex flex-col-reverse md:flex-row-reverse text-black rounded-lg overflow-hidden shadow-lg max-w-6xl w-full mx-auto bg-white">
      {/* Left: Form */}
      <div className="p-2 sm:p-4 md:p-6 ">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary mb-4 text-center md:text-left">
          Book an Appointment
        </h2>

        <div className="my-2 ">
          <Label htmlFor="name" className="text-sm sm:text-base md:text-lg">Name</Label>
          <Input
            id="name"
            placeholder="Your Name"
            className="bg-white text-black border-gray-300 w-full"
          />
        </div>

        <div className="my-2 ">
          <Label htmlFor="email" className="text-sm sm:text-base md:text-lg">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="bg-white text-black border-gray-300 w-full"
          />
        </div>

        <div className="text-md sm:text-lg md:text-xl my-2 space-y-1 ">
          <Label htmlFor="time" className="text-sm sm:text-base md:text-lg">Appointment Time</Label>
          <DateTimePicker/>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-evenly">
          <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">
            Submit
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400">
              Close
            </Button>
          </DialogClose>
        </div>
      </div>

      {/* Right: Image */}
      <div className="md:flex flex-1 items-center justify-center bg-secondary">
        <div className="relative w-full h-full">
          <Image
            src="/form_image/form1.avif"
            alt="Form"
            layout="fill"
            objectFit="cover"
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
