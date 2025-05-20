'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

export function PriceRangeSlider({
  min,
  max,
  step,
  value,
  onValueChange,
  formatValue = (v) => `₹${v.toLocaleString()}`,
  className,
  ...props
}: PriceRangeSliderProps & React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <div className="space-y-4">
      <SliderPrimitive.Root
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className
        )}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-gray-200">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-gray-900" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full border border-gray-200 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full border border-gray-200 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderPrimitive.Root>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{formatValue(value[0])}</span>
        <span>{formatValue(value[1])}</span>
      </div>
    </div>
  );
}
