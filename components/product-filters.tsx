'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter as FilterIcon, ChevronDown, ChevronUp } from "lucide-react";
import { FilterOption } from "@/app/types";
import { FILTER_CATEGORIES, POPULAR_FILTERS } from "@/app/lib/constants";

interface ProductFiltersProps {
  activeFilters: FilterOption[];
  onFilterChange: (filter: FilterOption) => void;
  onFilterRemove: (filterId: string) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Memoized filter button to prevent unnecessary re-renders
const FilterButton = React.memo(function FilterButton({
  filter,
  isActive,
  onClick,
}: {
  filter: FilterOption;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-full text-sm transition-colors
        ${isActive
          ? 'bg-gray-900 text-white'
          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
        }
      `}
    >
      {filter.label}
    </button>
  );
});

export function ProductFilters({
  activeFilters,
  onFilterChange,
  onFilterRemove,
  onClearFilters,
  isMobile = false,
  isOpen = false,
  onOpenChange,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(FILTER_CATEGORIES.map(c => c.id))
  );

  const toggleSection = React.useCallback((sectionId: string) => {
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

  const filterCount = activeFilters.length;

  const renderFilterContent = React.useCallback(() => (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-6 space-y-6">
          {FILTER_CATEGORIES.map((category) => {
            const isExpanded = expandedSections.has(category.id);

            return (
              <div key={category.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleSection(category.id)}
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
                {isExpanded && (
                  <div className="space-y-3 pb-4">
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
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action buttons*/}
      <div className="flex-shrink-0 p-6 bg-white border-t">
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
            Show {filterCount ? filterCount : 'All'}
          </Button>
        </div>
      </div>
    </div>
  ), [activeFilters, expandedSections, filterCount, onClearFilters, onFilterChange, onOpenChange, toggleSection]);

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => onOpenChange?.(!isOpen)}
        >
          <FilterIcon className="h-5 w-5" />
        </Button>
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
          <SheetContent
            side="left"
            className="w-full sm:max-w-md p-0 rounded-r-xl flex flex-col"
          >
            <SheetHeader className="flex-shrink-0 p-6 border-b">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            {renderFilterContent()}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <Button
          variant="outline"
          className="gap-2 rounded-full"
          onClick={() => onOpenChange?.(!isOpen)}
        >
          <FilterIcon className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        <SheetContent
          side="left"
          className="w-[400px] max-w-md p-0 rounded-r-xl flex flex-col backdrop-blur-lg bg-white/95"
        >
          <SheetHeader className="flex-shrink-0 p-6 border-b">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          {renderFilterContent()}
        </SheetContent>
      </Sheet>

      {/* Popular filters */}
      {!isOpen && POPULAR_FILTERS.map((filter) => (
        <FilterButton
          key={filter.id}
          filter={filter}
          isActive={activeFilters.some(f => f.id === filter.id)}
          onClick={() => onFilterChange(filter)}
        />
      ))}

      {/* Active filters */}
      {activeFilters.map((filter) => (
        <div
          key={filter.id}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-900 text-white"
        >
          <span className="text-sm">{filter.label}</span>
          <button
            onClick={() => onFilterRemove(filter.id)}
            className="text-white/70 hover:text-white ml-1"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
