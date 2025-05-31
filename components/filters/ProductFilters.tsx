'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter as FilterIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useFilters } from '@/hooks/use-filters';
import { PriceRangeSlider } from "@/components/ui/price-range-slider";
import { PriceButtons } from "@/components/ui/price-buttons";

/**
 * Filter Section Types
 * These types define the structure of filter sections and their options.
 */

type FilterSectionId = 'category' | 'priceRange' | 'gender' | 'stamp' | 'stones' | 'subCategory';
type PriceRangeValue = [number, number];

interface FilterSectionProps {
  config: any;
  options: any[];
  isExpanded: boolean;
  activeValues: any;
  onToggle: (sectionId: FilterSectionId) => void;
  onUpdate: (values: any) => void;
}

interface ProductFiltersProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Individual Filter Section - Clean implementation
 */
const FilterSection: React.FC<FilterSectionProps> = React.memo(({
  config,
  options,
  isExpanded,
  activeValues,
  onToggle,
  onUpdate
}) => {
  const currentValues = (activeValues as string[]) || [];

  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      const newValues = [...currentValues, optionValue];
      onUpdate(newValues);
    } else {
      const newValues = currentValues.filter(v => v !== optionValue);
      onUpdate(newValues.length > 0 ? newValues : null);
    }
  };

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => onToggle(config.id as FilterSectionId)}
        className="flex items-center justify-between w-full text-left py-3"
      >
        <h3 className="font-medium text-base text-gray-900">
          {config.label}
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
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                id={option.id}
                checked={currentValues.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.value, checked === true)
                }
                className="rounded-sm"
              />
              <span className="text-sm text-gray-600">
                {option.label}
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
 * Main Product Filters
 */
export function ProductFilters({
  isMobile = false,
  isOpen = false,
  onOpenChange,
  className = ''
}: ProductFiltersProps): React.ReactElement {
  const {
    filterState,
    enabledConfigs,
    filterOptions,
    updateFilter,
    clearAllFilters,
    activeFilters
  } = useFilters();

  // State for expanded sections and price range
  const [expandedSections, setExpandedSections] = React.useState<Set<FilterSectionId>>(
    new Set(['category', 'priceRange', 'gender'])
  );

  const [priceRange, setPriceRange] = React.useState<PriceRangeValue>([0, 200000]);

  // Sync price range with filters
  React.useEffect(() => {
    const currentPriceValue = filterState.priceRange;
    if (currentPriceValue && typeof currentPriceValue === 'string' && currentPriceValue.includes('-')) {
      const [min, max] = currentPriceValue.split('-').map(Number);
      setPriceRange([min, max]);
    } else {
      // Reset to default range when filter is cleared
      setPriceRange([0, 200000]);
    }
  }, [filterState.priceRange]);

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
    updateFilter('priceRange', `${value[0]}-${value[1]}`);
  }, [updateFilter]);

  const filterCount = activeFilters.length;
  const nonPriceConfigs = enabledConfigs.filter(config => config.id !== 'priceRange');

  // Filter content
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
            {nonPriceConfigs.map((config) => (
              <FilterSection
                key={config.id}
                config={config}
                options={filterOptions[config.id] || []}
                isExpanded={expandedSections.has(config.id as FilterSectionId)}
                activeValues={filterState[config.id]}
                onToggle={toggleSection}
                onUpdate={(values) => updateFilter(config.id, values)}
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
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
          <Button
            variant="default"
            className="flex-1"
            onClick={() => onOpenChange?.(false)}
          >
            Show Results
          </Button>
        </div>
      </div>
    </div>
  ), [enabledConfigs, expandedSections, filterOptions, filterState, handlePriceRangeChange, clearAllFilters, onOpenChange, priceRange, toggleSection, updateFilter, nonPriceConfigs]);

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
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-white text-xs flex items-center justify-center">
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
    <div className={`flex items-center gap-3 ${className}`}>
      <Sheet open={isOpen} onOpenChange={onOpenChange} modal={false}>
        <Button
          variant="outline"
          className="gap-2 rounded-full relative h-10 hover:bg-gray-50"
          onClick={() => onOpenChange?.(!isOpen)}
        >
          <FilterIcon className="h-4 w-4" />
          <span>Filter</span>
          {filterCount > 0 && (
            <span className="ml-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
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

/**
 * Mobile Product Filters - Clean wrapper
 */
interface MobileProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileProductFilters({ isOpen, onClose }: MobileProductFiltersProps) {
  return (
    <ProductFilters
      isMobile={true}
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
    />
  );
}
