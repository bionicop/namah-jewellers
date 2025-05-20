'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

interface PriceButtonsProps {
  onSelect: (min: number, max: number) => void;
  selectedRange?: [number, number];
}

const PRICE_RANGES = [
  { label: 'Under ₹50K', min: 0, max: 50000 },
  { label: '₹50K-₹1L', min: 50000, max: 100000 },
  { label: '₹1L-₹2L', min: 100000, max: 200000 },
  { label: 'Above ₹2L', min: 200000, max: Number.MAX_SAFE_INTEGER },
];

export function PriceButtons({ onSelect, selectedRange }: PriceButtonsProps) {
  const isSelected = React.useCallback((min: number, max: number) => {
    if (!selectedRange) return false;
    return selectedRange[0] === min && selectedRange[1] === max;
  }, [selectedRange]);

  const handleSelect = React.useCallback((min: number, max: number) => {
    onSelect(min, max);
  }, [onSelect]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {PRICE_RANGES.map(({ label, min, max }) => (
        <Button
          key={label}
          variant={isSelected(min, max) ? "default" : "outline"}
          size="sm"
          className="w-full"
          onClick={() => handleSelect(min, max)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
