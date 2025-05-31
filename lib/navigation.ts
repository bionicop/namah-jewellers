/**
 * Navigation utilities for generating filtered URLs
 */

/**
 * Generates a buy page URL with appropriate filters based on jewelry category and item
 */
export function generateBuyPageUrl(categoryTitle: string, itemName: string): string {
  const baseUrl = '/buy';
  const filters: string[] = [];

  // Check if the item is a main category itself
  const normalizedItem = normalizeItemName(itemName);

  // Items that are main categories (based on the filter extractor's normalizeCategory function)
  const mainCategoryItems = [
    'Bangles', 'Bracelet', 'Ladies Ring', 'Earrings',
    'Necklace Set', 'Pendant Set', 'Pacheli'
  ];

  if (mainCategoryItems.includes(normalizedItem)) {
    // This item is a main category, use category filter
    filters.push(`category:${normalizedItem}`);
  } else {
    // Handle parent category filtering first
    if (categoryTitle === 'Diamond Jewellery') {
      filters.push('category:Diamond Jewellery');
    } else if (categoryTitle === 'Gold Jewellery') {
      filters.push('category:Gold Jewellery');
    }

    // Add subcategory filter for specific items that are not main categories
    if (normalizedItem) {
      filters.push(`subCategory:${normalizedItem}`);
    }
  }

  // If no filters, return base URL
  if (filters.length === 0) {
    return baseUrl;
  }

  // Build filter query string
  const filterString = filters.join('|');
  return `${baseUrl}?filters=${encodeURIComponent(filterString)}`;
}

/**
 * Generates a buy page URL for main category pages (for mobile circular categories)
 */
export function generateCategoryUrl(categoryTitle: string): string {
  const baseUrl = '/buy';

  if (categoryTitle === 'All Jewellery') {
    return baseUrl; // Show all products
  }

  if (categoryTitle === 'Diamond Jewellery') {
    return `${baseUrl}?filters=${encodeURIComponent('category:Diamond Jewellery')}`;
  }

  if (categoryTitle === 'Gold Jewellery') {
    return `${baseUrl}?filters=${encodeURIComponent('category:Gold Jewellery')}`;
  }

  return baseUrl;
}

/**
 * Normalizes item names to match the subcategory values in the filter system
 */
function normalizeItemName(itemName: string): string {
  // Create a mapping for common variations
  const itemMapping: Record<string, string> = {
    // Rings
    'Rings': 'Ladies Ring',
    'Engagement Rings': 'Ladies Ring',
    'Gold Rings': 'Ladies Ring',
    'Diamond Rings': 'Ladies Ring',

    // Earrings
    'Earrings': 'Earrings',
    'Gold Earrings': 'Earrings',
    'Diamond Earrings': 'Earrings',
    'Ruby Earrings': 'Earrings',
    'Jhumkas': 'Earrings',

    // Necklaces and chains
    'Necklaces': 'Necklace Set',
    'Gold Necklace': 'Necklace Set',
    'Diamond Necklaces': 'Necklace Set',
    'Gold Chains': 'Necklace Set',
    'Mangalsutras': 'Necklace Set',
    'Mangalsutra Chain 18 KT': 'Necklace Set',
    'Mangalsutra Chain 14 KT': 'Necklace Set',

    // Pendants
    'Pendants': 'Pendant Set',
    'Diamond Pendants': 'Pendant Set',

    // Bangles and bracelets
    'Bangles': 'Bangles',
    'Gold Bangles': 'Bangles',
    'Diamond Bangles': 'Bangles',
    'Bracelets': 'Bracelet',
    'Gold Bracelets': 'Bracelet',
    'Diamond Bracelets': 'Bracelet',

    // Other items
    'Nose Pins': 'Nose Pins',
    'Kadas': 'Kadas',
  };

  // Return mapped value or original name if no mapping exists
  return itemMapping[itemName] || itemName;
}

/**
 * Utility to get all available filter categories for reference
 */
export const FILTER_CATEGORIES = {
  MAIN_CATEGORIES: ['All Jewellery', 'Gold Jewellery', 'Diamond Jewellery'],
  SUB_CATEGORIES: [
    'Ladies Ring', 'Earrings', 'Necklace Set', 'Pendant Set',
    'Bangles', 'Bracelet', 'Nose Pins', 'Kadas'
  ]
} as const;
