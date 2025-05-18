'use client';

import React from 'react';
import { SortOption } from "@/app/types";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductSortProps {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
  isMobile?: boolean;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'priceLowToHigh', label: 'Price Low to High' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Popular' },
];

export function ProductSort({ value, onValueChange, isMobile = false }: ProductSortProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => {
          const currentIndex = sortOptions.findIndex(opt => opt.value === value);
          const nextIndex = (currentIndex + 1) % sortOptions.length;
          onValueChange(sortOptions[nextIndex].value);
        }}
      >
        <ArrowUpDown className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2 relative" ref={dropdownRef}>
      <span className="text-sm text-gray-500">Sort By:</span>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-gray-800 hover:text-gray-600 focus:outline-none"
        >
          <span className="font-medium">
            {sortOptions.find(opt => opt.value === value)?.label}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`
                  w-full px-4 py-2 text-left text-sm
                  ${value === option.value
                    ? 'bg-gray-50 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
                onClick={() => {
                  onValueChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
