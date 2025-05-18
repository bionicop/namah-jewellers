// Basic data arrays
export const SUB_CATEGORIES = ['Earrings', 'Necklaces', 'Rings', 'Bangles'] as const;
export const STYLES = ['Traditional', 'Contemporary', 'Fusion'] as const;
export const GENDERS = ['Women', 'Men', 'Unisex'] as const;
export const PRICE_RANGES = ['25k-50k', '50k-100k', '100k+'] as const;
export const STAMPS = ['22K', '24K'] as const;

// Placeholder images
export const PRODUCT_IMAGES = [
  'https://picsum.photos/300/300?random=1',
  'https://picsum.photos/300/300?random=2',
  'https://picsum.photos/300/300?random=3',
  'https://picsum.photos/300/300?random=4',
  'https://picsum.photos/300/300?random=5',
] as const;

// Filter categories with their options
export const FILTER_CATEGORIES = [
  {
    id: 'subCategory',
    label: 'Category',
    options: SUB_CATEGORIES.map(item => ({
      id: item.toLowerCase(),
      label: item,
      category: 'subCategory' as const,
    })),
  },
  {
    id: 'style',
    label: 'Style',
    options: STYLES.map(item => ({
      id: item.toLowerCase(),
      label: item,
      category: 'style' as const,
    })),
  },
  {
    id: 'gender',
    label: 'Gender',
    options: GENDERS.map(item => ({
      id: item.toLowerCase(),
      label: item,
      category: 'gender' as const,
    })),
  },
  {
    id: 'priceRange',
    label: 'Price Range',
    options: PRICE_RANGES.map(item => ({
      id: item.toLowerCase(),
      label: item,
      category: 'priceRange' as const,
    })),
  },
  {
    id: 'stamp',
    label: 'Stamp',
    options: STAMPS.map(item => ({
      id: item.toLowerCase(),
      label: item,
      category: 'stamp' as const,
    })),
  },
] as const;

// Popular filters for quick access
export const POPULAR_FILTERS = [
  { id: 'women', label: 'Women', category: 'gender' as const },
  { id: 'traditional', label: 'Traditional', category: 'style' as const },
  { id: '22k', label: '22K', category: 'stamp' as const },
  { id: '25k-50k', label: '₹25,000-₹50,000', category: 'priceRange' as const },
] as const;

// Sort options
export const SORT_OPTIONS = [
  { value: 'priceLowToHigh', label: 'Price Low to High' },
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Popular' },
] as const;

// Pagination
export const ITEMS_PER_PAGE = 12;

// Layout breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const;

// API endpoints for future use
export const API_ENDPOINTS = {
  products: '/api/products',
  filters: '/api/filters',
  wishlist: '/api/wishlist',
} as const;
