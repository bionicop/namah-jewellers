/**
 * Universal Filter System - Clean Export Index
 * Only exports what's actually needed
 */

// Main components
export { ProductFilters, MobileProductFilters } from './ProductFilters';

// Main hook
export { useFilters } from '@/hooks/use-filters';

// Configuration and types
export {
  FILTER_CONFIG,
  getEnabledFilterConfigs,
  generateFilterOptions,
  applyAllFilters,
  updateFilterConfig,
  enableFilter,
  disableFilter
} from '@/lib/filter-config';

export type {
  FilterConfig,
  FilterOption,
  FilterType
} from '@/lib/filter-config';

export type {
  FilterState,
  UseFiltersReturn
} from '@/hooks/use-filters';

export {
  extractFilterOptions,
  getCachedFilterOptions,
  getSubCategoriesForCategory,
  refreshFilterCache
} from '@/lib/filter-extractor';

export type { ExtractedFilterOptions } from '@/lib/filter-extractor';
