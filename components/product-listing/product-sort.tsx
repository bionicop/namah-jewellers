'use client';

import React from 'react';
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SORT_OPTIONS } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Type definitions for better type safety
 */
type SortOption = typeof SORT_OPTIONS[number]['value'];

interface ProductSortProps {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
  isMobile?: boolean;
}

/**
 * Mobile version of the sort component that cycles through options
 */
const MobileSortButton = React.memo(({ value, onValueChange }: Omit<ProductSortProps, 'isMobile'>) => {
  const handleClick = React.useCallback(() => {
    const currentIndex = SORT_OPTIONS.findIndex(opt => opt.value === value);
    const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length;
    onValueChange(SORT_OPTIONS[nextIndex].value);
  }, [value, onValueChange]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={handleClick}
      aria-label="Change sort order"
    >
      <ArrowUpDown className="h-5 w-5" />
    </Button>
  );
});

MobileSortButton.displayName = 'MobileSortButton';

/**
 * Desktop version of the sort component using a Select dropdown
 */
const DesktopSort = React.memo(({ value, onValueChange }: Omit<ProductSortProps, 'isMobile'>) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Sort By:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0">
          <SelectValue placeholder="Select sort order" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-sm"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});

DesktopSort.displayName = 'DesktopSort';

/**
 * ProductSort component that handles product sorting in both mobile and desktop views
 * Uses different UI components based on the viewport size
 */
export function ProductSort({ value, onValueChange, isMobile = false }: ProductSortProps): React.ReactElement {
  // Use memoized handler to prevent unnecessary rerenders
  const handleValueChange = React.useCallback((newValue: SortOption) => {
    onValueChange(newValue);
  }, [onValueChange]);

  return isMobile ? (
    <MobileSortButton value={value} onValueChange={handleValueChange} />
  ) : (
    <DesktopSort value={value} onValueChange={handleValueChange} />
  );
}

// Memoize the main component
export default React.memo(ProductSort);
