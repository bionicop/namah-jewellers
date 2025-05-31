import { Product } from '@/app/data/types';

/**
 * Smart Filter Extractor
 * Automatically extracts unique filter options from product data
 * No more hardcoded values - everything comes from actual products
 */

export interface ExtractedFilterOptions {
  categories: string[];
  subCategories: string[];
  genders: string[];
  stamps: string[];
  priceRange: {
    min: number;
    max: number;
    ranges: Array<{ label: string; min: number; max: number; value: string }>;
  };
  stones: Array<{ id: string; label: string; count: number }>;
  itemsByCategory: Record<string, number>;
}

/**
 * Extracts all unique filter options from product data
 */
export function extractFilterOptions(products: Product[]): ExtractedFilterOptions {
  // Extract unique categories (normalize case variations)
  const categories = [...new Set(products.map(p => normalizeCategory(p.itemCategory)))]
    .filter(Boolean)
    .sort();

  // Extract unique subcategories
  const subCategories = [...new Set(products.map(p => p.itemSubCategory))]
    .filter(Boolean)
    .sort();

  // Extract unique genders
  const genders = [...new Set(products.map(p => p.gender))]
    .filter(Boolean)
    .sort();

  // Extract unique stamps
  const stamps = [...new Set(products.map(p => p.stamp))]
    .filter(Boolean)
    .map(s => s.toString())
    .sort((a, b) => parseInt(a) - parseInt(b));

  // Calculate price range
  const prices = products.map(p => p.itemMRP).filter(p => p > 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Generate smart price ranges based on actual data distribution
  const priceRanges = generateSmartPriceRanges(prices);

  // Extract stone information
  const stones = extractStoneOptions(products);

  // Count items by category for filter relevance
  const itemsByCategory = categories.reduce((acc, category) => {
    acc[category] = products.filter(p => normalizeCategory(p.itemCategory) === category).length;
    return acc;
  }, {} as Record<string, number>);

  return {
    categories,
    subCategories,
    genders,
    stamps,
    priceRange: {
      min: Math.floor(minPrice / 1000) * 1000, // Round down to nearest thousand
      max: Math.ceil(maxPrice / 1000) * 1000,  // Round up to nearest thousand
      ranges: priceRanges
    },
    stones,
    itemsByCategory
  };
}

/**
 * Normalizes category names to handle case variations
 */
function normalizeCategory(category: string): string {
  if (!category) return '';

  // Handle common variations found in the data
  const normalized = category.trim();

  // Normalize case variations
  if (normalized.toLowerCase().includes('ladies ring')) {
    return 'Ladies Ring';
  }
  if (normalized.toLowerCase().includes('diamond jewellery')) {
    return 'Diamond Jewellery';
  }
  if (normalized.toLowerCase().includes('gold jewellery')) {
    return 'Gold Jewellery';
  }
  if (normalized.toLowerCase().includes('earrings')) {
    return 'Earrings';
  }
  if (normalized.toLowerCase().includes('bracelet')) {
    return 'Bracelet';
  }
  if (normalized.toLowerCase().includes('necklace')) {
    return 'Necklace Set';
  }
  if (normalized.toLowerCase().includes('pendant')) {
    return 'Pendant Set';
  }
  if (normalized.toLowerCase().includes('pacheli')) {
    return 'Pacheli';
  }
  if (normalized.toLowerCase().includes('bangles')) {
    return 'Bangles';
  }

  return normalized;
}

/**
 * Generates smart price ranges based on data distribution
 */
function generateSmartPriceRanges(prices: number[]): Array<{ label: string; min: number; max: number; value: string }> {
  const sortedPrices = [...prices].sort((a, b) => a - b);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  // Create ranges that make sense for jewelry pricing
  const ranges = [
    { label: 'Under ₹50K', min: 0, max: 50000, value: '0-50000' },
    { label: '₹50K - ₹1L', min: 50000, max: 100000, value: '50000-100000' },
    { label: '₹1L - ₹2L', min: 100000, max: 200000, value: '100000-200000' },
    { label: '₹2L - ₹3L', min: 200000, max: 300000, value: '200000-300000' },
    { label: '₹3L - ₹5L', min: 300000, max: 500000, value: '300000-500000' },
  ];

  // Add "Above ₹5L" if there are products above 5L
  if (max > 500000) {
    ranges.push({
      label: `Above ₹5L`,
      min: 500000,
      max: Math.ceil(max / 100000) * 100000,
      value: `500000-${Math.ceil(max / 100000) * 100000}`
    });
  }

  // Only return ranges that have products in them
  return ranges.filter(range => {
    return sortedPrices.some(price => price >= range.min && price <= range.max);
  });
}

/**
 * Extracts stone type options with counts
 */
function extractStoneOptions(products: Product[]): Array<{ id: string; label: string; count: number }> {
  const diamondCount = products.filter(p => p.diamondWeight > 0).length;
  const coloredStoneCount = products.filter(p => p.coloredStonePresent).length;

  return [
    {
      id: 'diamonds',
      label: 'Diamonds',
      count: diamondCount
    },
    {
      id: 'colored-stones',
      label: 'Colored Stones',
      count: coloredStoneCount
    }
  ].filter(stone => stone.count > 0); // Only include stones that exist in products
}

/**
 * Gets subcategories for a specific category
 */
export function getSubCategoriesForCategory(products: Product[], category: string): string[] {
  const normalizedCategory = normalizeCategory(category);
  return [...new Set(
    products
      .filter(p => normalizeCategory(p.itemCategory) === normalizedCategory)
      .map(p => p.itemSubCategory)
      .filter(Boolean)
  )].sort();
}

/**
 * Gets all unique tags/styles from products (if needed for future filters)
 */
export function extractUniqueStyles(products: Product[]): string[] {
  return [...new Set(
    products
      .map(p => p.byStyle)
      .filter(Boolean)
      .filter(style => style.trim().length > 0)
  )].sort();
}

/**
 * Cache extracted options for performance
 */
let cachedOptions: ExtractedFilterOptions | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedFilterOptions(products: Product[]): ExtractedFilterOptions {
  const now = Date.now();

  if (!cachedOptions || (now - cacheTimestamp) > CACHE_DURATION) {
    cachedOptions = extractFilterOptions(products);
    cacheTimestamp = now;
  }

  return cachedOptions;
}

/**
 * Force refresh the cache (useful when product data changes)
 */
export function refreshFilterCache(): void {
  cachedOptions = null;
  cacheTimestamp = 0;
}
