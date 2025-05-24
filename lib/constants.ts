// Company Information
export const COMPANY_INFO = {
  name: 'NAMAH Jewellers',
  tagline: 'Where artistry and elegance come together',
  description: 'Create jewellery that transcends time with traditional craftsmanship and modern innovation.',

  contact: {
    phone: '+91 83685 82277',
    whatsapp: 'https://wa.me/918368582277',
    email: 'info@namahjewellers.com',
    address: 'Karol Bagh, New Delhi, India'
  },

  social: {
    instagram: 'https://instagram.com/namahjewellers',
    facebook: 'https://facebook.com/jewelsbynamah',
    twitter: 'https://twitter.com/namahjewellers'
  },

  businessHours: {
    weekdays: 'Monday - Saturday',
    hours: '10:00 AM - 8:00 PM',
    closed: 'Sunday'
  }
} as const;

// Form Constants
export const INQUIRY_TYPES = [
  { id: 'general', label: 'General Inquiry', icon: '💬' },
  { id: 'product', label: 'Product Inquiry', icon: '💍' },
  { id: 'custom', label: 'Custom Design', icon: '✨' },
  { id: 'repair', label: 'Repair Service', icon: '🔧' },
  { id: 'consultation', label: 'Consultation', icon: '👥' },
  { id: 'order', label: 'Order Status', icon: '📦' }
] as const


// Basic data arrays
export const CATEGORIES = ['Diamond Jewellery', 'Gold Jewellery'] as const;
export const SUB_CATEGORIES = [
  'Diamond Pendant Set',
  'Diamond Ladies Ring',
  'Cocktail Ring',
  'Ladies Ring'
] as const;
export const GENDERS = ['Ladies', 'Gents', 'Unisex'] as const;
export const PRICE_RANGES = ['0-50k', '50k-100k', '100k+'] as const;
export const STAMPS = ['14', '18', '22', '24'] as const;

// Filter categories with their options
export const FILTER_CATEGORIES = [
  {
    id: 'category',
    label: 'Category',
    options: CATEGORIES.map(item => ({
      id: item.toLowerCase().replace(' ', '-'),
      label: item,
      value: item,
      category: 'category' as const,
    })),
  },
  {
    id: 'subCategory',
    label: 'Sub Category',
    options: SUB_CATEGORIES.map(item => ({
      id: item.toLowerCase().replace(' ', '-'),
      label: item,
      value: item,
      category: 'subCategory' as const,
    })),
  },
  {
    id: 'gender',
    label: 'Gender',
    options: GENDERS.map(item => ({
      id: item.toLowerCase(),
      label: item,
      value: item,
      category: 'gender' as const,
    })),
  },
  {
    id: 'priceRange',
    label: 'Price Range',
    options: PRICE_RANGES.map(item => ({
      id: item.toLowerCase(),
      label: `₹${item}`,
      value: item,
      category: 'priceRange' as const,
    })),
  },
  {
    id: 'stamp',
    label: 'Gold Stamp',
    options: STAMPS.map(item => ({
      id: item.toLowerCase(),
      label: `${item}K`,
      value: item,
      category: 'stamp' as const,
    })),
  },
  {
    id: 'stones',
    label: 'Stones',
    options: [
      {
        id: 'colored-stones',
        label: 'Colored Stones',
        value: 'true',
        category: 'stones' as const,
      },
      {
        id: 'diamonds',
        label: 'Diamonds',
        value: 'true',
        category: 'stones' as const,
      }
    ],
  },
] as const;

// Popular filters for quick access
export const POPULAR_FILTERS = [
  {
    id: 'diamond-jewellery',
    label: 'Diamond Jewellery',
    value: 'Diamond Jewellery',
    category: 'category' as const
  },
  {
    id: 'ladies',
    label: 'Ladies',
    value: 'Ladies',
    category: 'gender' as const
  },
  {
    id: '14k',
    label: '14K',
    value: '14',
    category: 'stamp' as const
  },
  {
    id: '0-50k',
    label: '₹0-₹50,000',
    value: '0-50k',
    category: 'priceRange' as const
  },
] as const;

// Sort options
export const SORT_OPTIONS = [
  { value: 'priceLowToHigh', label: 'Price Low to High' },
  { value: 'priceHighToLow', label: 'Price High to Low' },
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
