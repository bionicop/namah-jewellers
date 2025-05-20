'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter as FilterIcon, ChevronDown, ChevronUp } from "lucide-react";
import { type FilterOption, type ProductCategory, type ProductSubCategory } from "@/app/data/types";
import { FILTER_CATEGORIES } from "@/lib/constants";
import { PriceRangeSlider } from "@/components/ui/price-range-slider";
import { PriceButtons } from "@/components/ui/price-buttons";

// Type definitions for better type safety
type FilterSectionId = 'category' | 'priceRange' | 'gender' | 'stamp' | 'stones' | 'subCategory';
type PriceRangeValue = [number, number];

interface FilterSectionProps {
  category: typeof FILTER_CATEGORIES[number];
  isExpanded: boolean;
  activeFilters: FilterOption[];
  onToggle: (sectionId: FilterSectionId) => void;
  onFilterChange: (filter: FilterOption) => void;
}

interface ProductFiltersProps {
  activeFilters: FilterOption[];
  onFilterChange: (filter: FilterOption) => void;
  onFilterRemove: (filterId: string) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Renders an individual filter section with a collapsible header and checkboxes
 */
const FilterSection: React.FC<FilterSectionProps> = React.memo(({
  category,
  isExpanded,
  activeFilters,
  onToggle,
  onFilterChange
}) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => onToggle(category.id as FilterSectionId)}
        className="flex items-center justify-between w-full text-left py-3"
      >
        <h3 className="font-medium text-base text-gray-900">
          {category.label}
        </h3>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-3 py-2">
          {category.options.map((filter) => (
            <label
              key={filter.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                id={filter.id}
                checked={activeFilters.some((f) => f.id === filter.id)}
                onCheckedChange={() => onFilterChange(filter)}
                className="rounded-sm"
              />
              <span className="text-sm text-gray-600">
                {filter.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
});

FilterSection.displayName = 'FilterSection';

/**
 * Product filters component that handles both mobile and desktop views
 * Manages filter state and provides a UI for filter selection
 */
export function ProductFilters({
  activeFilters,
  onFilterChange,
  onFilterRemove,
  onClearFilters,
  isMobile = false,
  isOpen = false,
  onOpenChange,
}: ProductFiltersProps): React.ReactElement {
  // State management
  const [expandedSections, setExpandedSections] = React.useState<Set<FilterSectionId>>(
    new Set(['category', 'priceRange', 'gender'])
  );

  const [priceRange, setPriceRange] = React.useState<PriceRangeValue>([0, 200000]);

  // Effect to sync price range with active filters
  React.useEffect(() => {
    const priceFilter = activeFilters.find(filter => filter.category === 'priceRange');
    if (priceFilter?.value.includes('-')) {
      const [min, max] = priceFilter.value.split('-').map(Number);
      setPriceRange([min, max]);
    }
  }, [activeFilters]);

  // Handlers
  const toggleSection = React.useCallback((sectionId: FilterSectionId) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  }, []);

  const handlePriceRangeChange = React.useCallback((value: PriceRangeValue) => {
    setPriceRange(value);

    // Remove any existing price range filter
    const existingPriceFilters = activeFilters.filter(f => f.category === 'priceRange');
    existingPriceFilters.forEach(filter => onFilterRemove(filter.id));

    // Create and apply a new price range filter
    const priceFilter: FilterOption = {
      id: `price-range-${value[0]}-${value[1]}`,
      label: `₹${value[0].toLocaleString()} - ₹${value[1].toLocaleString()}`,
      value: `${value[0]}-${value[1]}`,
      category: 'priceRange'
    };
    onFilterChange(priceFilter);
  }, [onFilterChange, onFilterRemove, activeFilters]);

  const filterCount = activeFilters.length;

  // Memoized filter content render
  const renderFilterContent = React.useCallback(() => (
    <div className="h-full flex flex-col min-h-0 relative">
      <div className="flex-1 overflow-hidden">
        <div className="h-[calc(100vh-8rem)] overflow-y-auto px-6 pb-24">
          {/* Price Range */}
          <div className="py-4 border-b border-gray-100">
            <h3 className="font-medium text-base text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-6">
              <PriceRangeSlider
                min={0}
                max={200000}
                step={1000}
                value={priceRange}
                onValueChange={handlePriceRangeChange}
              />
              <PriceButtons
                selectedRange={priceRange}
                onSelect={(min, max) => handlePriceRangeChange([min, max])}
              />
            </div>
          </div>

          {/* Filter Categories */}
          <div className="space-y-4 py-4">
            {FILTER_CATEGORIES.filter(cat => cat.id !== 'priceRange').map((category) => (
              <FilterSection
                key={category.id}
                category={category}
                isExpanded={expandedSections.has(category.id as FilterSectionId)}
                activeFilters={activeFilters}
                onToggle={toggleSection}
                onFilterChange={onFilterChange}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 p-6 bg-white border-t sticky bottom-0 left-0 right-0 shadow-lg z-10">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClearFilters}
          >
            Clear All
          </Button>
          <Button
            variant="default"
            className="flex-1 bg-gray-900 hover:bg-gray-800"
            onClick={() => onOpenChange?.(false)}
          >
            Show Results
          </Button>
        </div>
      </div>
    </div>
  ), [activeFilters, expandedSections, handlePriceRangeChange, onClearFilters, onFilterChange, onOpenChange, priceRange, toggleSection]);

  // Mobile view
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative"
          onClick={() => onOpenChange?.(!isOpen)}
        >
          <FilterIcon className="h-5 w-5" />
          {filterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </Button>
        <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
          <SheetContent
            side="left"
            className="w-full sm:max-w-md p-0 rounded-r-xl flex flex-col h-full border-r"
          >
            <SheetHeader className="flex-shrink-0 p-6 border-b">
              <SheetTitle>Filters{filterCount > 0 && ` (${filterCount})`}</SheetTitle>
            </SheetHeader>
            {renderFilterContent()}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop view
  return (
    <div className="flex items-center gap-3">
      <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
        <Button
          variant="outline"
          className="gap-2 rounded-full relative h-10 hover:bg-gray-50"
          onClick={() => onOpenChange?.(!isOpen)}
        >
          <FilterIcon className="h-4 w-4" />
          <span>Filter</span>
          {filterCount > 0 && (
            <span className="ml-1 h-5 w-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </Button>
        <SheetContent
          side="left"
          className="w-[400px] max-w-md p-0 rounded-r-xl flex flex-col h-full backdrop-blur-lg bg-white/95"
        >
          <SheetHeader className="flex-shrink-0 p-6 border-b">
            <SheetTitle>Filters{filterCount > 0 && ` (${filterCount})`}</SheetTitle>
          </SheetHeader>
          {renderFilterContent()}
        </SheetContent>
      </Sheet>
    </div>
  );
}
