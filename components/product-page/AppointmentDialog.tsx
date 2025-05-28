'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import AppointmentForm from './AppointmentForm';

export default function AppointmentDialog() {
  return (
    <div className='flex flex-row justify-evenly w-full h-auto '>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-yellow-500 text-black hover:bg-yellow-600 text-md sm:text-lg md:text-xl p-2 m:p-4 md:p-6 ">
            Book Appointment
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px]">
          <AppointmentForm />
        </DialogContent>
      </Dialog>
      <Button variant="outline" className = {'text-md sm:text-lg md:text-xl p-2 m:p-4 md:p-6 '}>Product Inquiry</Button>
    </div>
  );
}
