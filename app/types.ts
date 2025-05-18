export type SubCategory = typeof SUB_CATEGORIES[number];
export type Style = typeof STYLES[number];
export type Gender = typeof GENDERS[number];
export type PriceRange = typeof PRICE_RANGES[number];
export type Stamp = typeof STAMPS[number];

export type FilterCategory =
  | 'subCategory'
  | 'style'
  | 'gender'
  | 'priceRange'
  | 'stamp';

export interface FilterOption {
  id: string;
  label: string;
  category: FilterCategory;
}

export type SortOption = 'priceLowToHigh' | 'newest' | 'popular';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: 'Gold';
  subCategory: SubCategory;
  style: Style;
  gender: Gender;
  price: number;
  stamp: Stamp;
  image: string;
  madeToOrder: boolean;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface QuickViewProduct extends Product {
  images: string[];
  specifications: {
    [key: string]: string;
  };
}

// Import the constant arrays used for type inference
import {
  SUB_CATEGORIES,
  STYLES,
  GENDERS,
  PRICE_RANGES,
  STAMPS,
} from '@/app/lib/constants';
