import { Product } from '@/app/data/types';
import { ExtractedFilterOptions } from './filter-extractor';

/**
 * Centralized Filter Configuration
 * Single source of truth for all filter behavior
 * Easy to customize and extend without touching multiple files
 */

export type FilterType = 'checkbox' | 'range' | 'radio' | 'toggle';

export interface FilterConfig {
  id: string;
  type: FilterType;
  label: string;
  enabled: boolean;
  priority: number; // Lower number = higher priority (appears first)
  dynamic: boolean; // If true, options come from product data
  defaultExpanded?: boolean;

  // For checkbox/radio filters
  options?: FilterOption[];

  // For range filters
  range?: {
    min: number;
    max: number;
    step: number;
    presets?: Array<{ label: string; min: number; max: number; value: string }>;
  };

  // Custom filter function for complex logic
  filterFunction?: (product: Product, values: any) => boolean;

  // Custom option generator for dynamic filters
  optionGenerator?: (products: Product[]) => FilterOption[];
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number; // Number of products matching this filter
  category: string;
}

/**
 * Main filter configuration - customize this to change filter behavior
 */
export const FILTER_CONFIG: Record<string, FilterConfig> = {
  // Category filter - dynamic from product data
  category: {
    id: 'category',
    type: 'checkbox',
    label: 'Category',
    enabled: true,
    priority: 1,
    dynamic: true,
    defaultExpanded: true,
    filterFunction: (product, values) => {
      if (!values || values.length === 0) return true;

      // Normalize product category for comparison
      const productCategory = normalizeCategory(product.itemCategory);
      return values.some((value: string) => {
        // Handle special mappings
        if (value === 'Diamond Jewellery') {
          return productCategory === 'Diamond Jewellery' ||
                 product.itemSubCategory?.includes('Diamond') ||
                 product.diamondWeight > 0;
        }
        if (value === 'Gold Jewellery') {
          return productCategory === 'Gold Jewellery' ||
                 (product.stamp && parseInt(product.stamp) > 0);
        }
        return productCategory === value;
      });
    }
  },

  // Subcategory filter - dynamic from product data
  subCategory: {
    id: 'subCategory',
    type: 'checkbox',
    label: 'Sub Category',
    enabled: true,
    priority: 2,
    dynamic: true,
    defaultExpanded: false,
    filterFunction: (product, values) => {
      if (!values || values.length === 0) return true;
      return values.includes(product.itemSubCategory);
    }
  },

  // Gender filter - dynamic from product data
  gender: {
    id: 'gender',
    type: 'checkbox',
    label: 'Gender',
    enabled: true,
    priority: 3,
    dynamic: true,
    defaultExpanded: true,
    filterFunction: (product, values) => {
      if (!values || values.length === 0) return true;
      return values.includes(product.gender);
    }
  },

  // Price range filter - hybrid (dynamic range, manual presets)
  priceRange: {
    id: 'priceRange',
    type: 'range',
    label: 'Price Range',
    enabled: true,
    priority: 4,
    dynamic: false, // We control the presets manually
    defaultExpanded: true,
    filterFunction: (product, value) => {
      if (!value) return true;

      if (typeof value === 'string' && value.includes('-')) {
        const [minStr, maxStr] = value.split('-');
        const min = parseInt(minStr);
        const max = parseInt(maxStr);
        return product.itemMRP >= min && product.itemMRP <= max;
      }

      if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
        return product.itemMRP >= value.min && product.itemMRP <= value.max;
      }

      return true;
    }
  },

  // Gold stamp filter - dynamic from product data
  stamp: {
    id: 'stamp',
    type: 'checkbox',
    label: 'Gold Stamp',
    enabled: true,
    priority: 5,
    dynamic: true,
    defaultExpanded: false,
    filterFunction: (product, values) => {
      if (!values || values.length === 0) return true;
      return values.includes(product.stamp);
    },
    optionGenerator: (products) => {
      const stamps = [...new Set(products.map(p => p.stamp))]
        .filter(Boolean)
        .sort((a, b) => parseInt(a) - parseInt(b));

      return stamps.map(stamp => ({
        id: `stamp-${stamp}`,
        label: `${stamp}K`,
        value: stamp,
        category: 'stamp',
        count: products.filter(p => p.stamp === stamp).length
      }));
    }
  },

  // Stone types filter - manual configuration with dynamic counts
  stones: {
    id: 'stones',
    type: 'checkbox',
    label: 'Stone Types',
    enabled: true,
    priority: 6,
    dynamic: false,
    defaultExpanded: false,
    filterFunction: (product, values) => {
      if (!values || values.length === 0) return true;

      return values.some((value: string) => {
        if (value === 'diamonds') {
          return product.diamondWeight > 0;
        }
        if (value === 'colored-stones') {
          return product.coloredStonePresent;
        }
        return false;
      });
    },
    optionGenerator: (products) => {
      const diamondCount = products.filter(p => p.diamondWeight > 0).length;
      const coloredStoneCount = products.filter(p => p.coloredStonePresent).length;

      const options = [];
      if (diamondCount > 0) {
        options.push({
          id: 'stones-diamonds',
          label: `Diamonds (${diamondCount})`,
          value: 'diamonds',
          category: 'stones',
          count: diamondCount
        });
      }
      if (coloredStoneCount > 0) {
        options.push({
          id: 'stones-colored',
          label: `Colored Stones (${coloredStoneCount})`,
          value: 'colored-stones',
          category: 'stones',
          count: coloredStoneCount
        });
      }
      return options;
    }
  }
};

/**
 * Generates filter options based on configuration and product data
 */
export function generateFilterOptions(
  config: FilterConfig,
  extractedOptions: ExtractedFilterOptions,
  products: Product[]
): FilterOption[] {
  if (!config.enabled) return [];

  // Use custom option generator if provided
  if (config.optionGenerator) {
    return config.optionGenerator(products);
  }

  // Handle dynamic filters
  if (config.dynamic) {
    switch (config.id) {
      case 'category':
        return extractedOptions.categories.map(cat => ({
          id: `category-${cat.toLowerCase().replace(/\s+/g, '-')}`,
          label: `${cat} (${extractedOptions.itemsByCategory[cat] || 0})`,
          value: cat,
          category: 'category',
          count: extractedOptions.itemsByCategory[cat] || 0
        }));

      case 'subCategory':
        return extractedOptions.subCategories.map(sub => ({
          id: `subcategory-${sub.toLowerCase().replace(/\s+/g, '-')}`,
          label: sub,
          value: sub,
          category: 'subCategory',
          count: products.filter(p => p.itemSubCategory === sub).length
        }));

      case 'gender':
        return extractedOptions.genders.map(gender => ({
          id: `gender-${gender.toLowerCase()}`,
          label: gender,
          value: gender,
          category: 'gender',
          count: products.filter(p => p.gender === gender).length
        }));

      case 'stamp':
        return extractedOptions.stamps.map(stamp => ({
          id: `stamp-${stamp}`,
          label: `${stamp}K`,
          value: stamp,
          category: 'stamp',
          count: products.filter(p => p.stamp === stamp).length
        }));
    }
  }

  // Handle range filters
  if (config.type === 'range' && config.id === 'priceRange') {
    return extractedOptions.priceRange.ranges.map(range => ({
      id: `price-${range.value}`,
      label: range.label,
      value: range.value,
      category: 'priceRange'
    }));
  }

  // Fallback to static options
  return config.options || [];
}

/**
 * Gets enabled filter configurations sorted by priority
 */
export function getEnabledFilterConfigs(): FilterConfig[] {
  return Object.values(FILTER_CONFIG)
    .filter(config => config.enabled)
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Gets filter configuration by ID
 */
export function getFilterConfig(filterId: string): FilterConfig | undefined {
  return FILTER_CONFIG[filterId];
}

/**
 * Applies a single filter to products
 */
export function applyFilter(products: Product[], filterId: string, values: any): Product[] {
  const config = getFilterConfig(filterId);
  if (!config || !config.filterFunction) return products;

  return products.filter(product => config.filterFunction!(product, values));
}

/**
 * Applies all active filters to products
 */
export function applyAllFilters(products: Product[], activeFilters: Record<string, any>): Product[] {
  let filteredProducts = [...products];

  // Apply each active filter
  Object.entries(activeFilters).forEach(([filterId, values]) => {
    if (values && (Array.isArray(values) ? values.length > 0 : true)) {
      filteredProducts = applyFilter(filteredProducts, filterId, values);
    }
  });

  return filteredProducts;
}

/**
 * Helper function to normalize category names (matches filter-extractor.ts)
 */
function normalizeCategory(category: string): string {
  if (!category) return '';

  const normalized = category.trim();

  if (normalized.toLowerCase().includes('ladies ring')) return 'Ladies Ring';
  if (normalized.toLowerCase().includes('diamond jewellery')) return 'Diamond Jewellery';
  if (normalized.toLowerCase().includes('gold jewellery')) return 'Gold Jewellery';
  if (normalized.toLowerCase().includes('earrings')) return 'Earrings';
  if (normalized.toLowerCase().includes('bracelet')) return 'Bracelet';
  if (normalized.toLowerCase().includes('necklace')) return 'Necklace Set';
  if (normalized.toLowerCase().includes('pendant')) return 'Pendant Set';
  if (normalized.toLowerCase().includes('pacheli')) return 'Pacheli';
  if (normalized.toLowerCase().includes('bangles')) return 'Bangles';

  return normalized;
}

/**
 * Updates filter configuration (useful for admin/settings)
 */
export function updateFilterConfig(filterId: string, updates: Partial<FilterConfig>): void {
  if (FILTER_CONFIG[filterId]) {
    FILTER_CONFIG[filterId] = { ...FILTER_CONFIG[filterId], ...updates };
  }
}

/**
 * Disables a filter
 */
export function disableFilter(filterId: string): void {
  updateFilterConfig(filterId, { enabled: false });
}

/**
 * Enables a filter
 */
export function enableFilter(filterId: string): void {
  updateFilterConfig(filterId, { enabled: true });
}
