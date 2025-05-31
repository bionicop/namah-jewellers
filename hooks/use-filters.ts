'use client';

import { useCallback, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { Product } from '@/app/data/types';
import { products } from '@/app/data/products';
import {
  getCachedFilterOptions,
  ExtractedFilterOptions
} from '@/lib/filter-extractor';
import {
  FILTER_CONFIG,
  getEnabledFilterConfigs,
  generateFilterOptions,
  applyAllFilters,
  FilterOption,
  FilterConfig
} from '@/lib/filter-config';

export interface FilterState {
  [filterId: string]: any;
}

export interface UseFiltersReturn {
  // Current filter state
  filterState: FilterState;

  // Filter options and configurations
  extractedOptions: ExtractedFilterOptions;
  enabledConfigs: FilterConfig[];
  filterOptions: Record<string, FilterOption[]>;

  // Filter actions
  updateFilter: (filterId: string, values: any) => void;
  removeFilter: (filterId: string) => void;
  clearAllFilters: () => void;

  // Filtered results
  filteredProducts: Product[];
  resultCount: number;

  // Active filter tracking
  activeFilters: FilterOption[];
  hasActiveFilters: boolean;
}

/**
 * Universal Filter Management Hook
 * Single source of truth for all filter operations
 */
export function useFilters(): UseFiltersReturn {
  // Single URL parameter for all filters
  const [filterQuery, setFilterQuery] = useQueryState('filters', {
    defaultValue: '',
  });

  // Parse current filter state from URL
  const filterState = useMemo(() => {
    return parseFilters(filterQuery || '');
  }, [filterQuery]);

  // Extract options from product data
  const extractedOptions = useMemo(() => {
    return getCachedFilterOptions(products);
  }, []);

  // Get enabled filter configurations
  const enabledConfigs = useMemo(() => {
    return getEnabledFilterConfigs();
  }, []);

  // Generate filter options for each enabled filter
  const filterOptions = useMemo(() => {
    const options: Record<string, FilterOption[]> = {};

    enabledConfigs.forEach(config => {
      options[config.id] = generateFilterOptions(config, extractedOptions, products);
    });

    return options;
  }, [enabledConfigs, extractedOptions]);

  // Apply all filters to products
  const filteredProducts = useMemo(() => {
    return applyAllFilters(products, filterState);
  }, [filterState]);

  // Get result count
  const resultCount = filteredProducts.length;

  // Convert current filter state to FilterOption[] for display
  const activeFilters = useMemo(() => {
    const active: FilterOption[] = [];

    Object.entries(filterState).forEach(([filterId, values]) => {
      if (!values) return;

      const config = FILTER_CONFIG[filterId];
      if (!config) return;

      if (Array.isArray(values)) {
        values.forEach(value => {
          const option = filterOptions[filterId]?.find(opt => opt.value === value);
          if (option) {
            active.push(option);
          }
        });
      } else if (filterId === 'priceRange' && typeof values === 'string') {
        const option = filterOptions[filterId]?.find(opt => opt.value === values);
        if (option) {
          active.push(option);
        }
      }
    });

    return active;
  }, [filterState, filterOptions]);

  const hasActiveFilters = activeFilters.length > 0;

  // Filter update function
  const updateFilter = useCallback((filterId: string, values: any) => {
    const newState = { ...filterState };

    if (!values || (Array.isArray(values) && values.length === 0)) {
      delete newState[filterId];
    } else {
      newState[filterId] = values;
    }

    setFilterQuery(serializeFilters(newState));
  }, [filterState, setFilterQuery]);

  // Remove specific filter
  const removeFilter = useCallback((filterId: string) => {
    const newState = { ...filterState };
    delete newState[filterId];
    setFilterQuery(serializeFilters(newState));
  }, [filterState, setFilterQuery]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilterQuery('');
  }, [setFilterQuery]);

  return {
    filterState,
    extractedOptions,
    enabledConfigs,
    filterOptions,
    updateFilter,
    removeFilter,
    clearAllFilters,
    filteredProducts,
    resultCount,
    activeFilters,
    hasActiveFilters,
  };
}

/**
 * Parsing and serialization functions for URL state management
 */

/**
 * Parses filter string from URL into FilterState object
 * Format: "category:Diamond Jewellery,Ladies Ring|gender:Ladies|priceRange:0-50000"
 */
function parseFilters(filterString: string): FilterState {
  if (!filterString) return {};

  try {
    const state: FilterState = {};
    const filterPairs = filterString.split('|');

    filterPairs.forEach(pair => {
      const [filterId, valuesString] = pair.split(':');
      if (!filterId || !valuesString) return;

      // Handle different filter types
      const config = FILTER_CONFIG[filterId];
      if (!config) return;

      if (config.type === 'checkbox') {
        // Multiple values separated by commas
        state[filterId] = valuesString.split(',').filter(Boolean);
      } else if (config.type === 'range') {
        // Single value for range
        state[filterId] = valuesString;
      } else {
        // Default to array
        state[filterId] = valuesString.split(',').filter(Boolean);
      }
    });

    return state;
  } catch (error) {
    console.warn('Failed to parse filter string:', error);
    return {};
  }
}

/**
 * Serializes FilterState object into URL-safe string
 */
function serializeFilters(filterState: FilterState): string {
  try {
    const parts: string[] = [];

    Object.entries(filterState).forEach(([filterId, values]) => {
      if (!values) return;

      let valueString: string;
      if (Array.isArray(values)) {
        if (values.length === 0) return;
        valueString = values.join(',');
      } else {
        valueString = String(values);
      }

      if (valueString) {
        parts.push(`${filterId}:${valueString}`);
      }
    });

    return parts.join('|');
  } catch (error) {
    console.warn('Failed to serialize filter state:', error);
    return '';
  }
}
