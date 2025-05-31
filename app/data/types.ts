/**
 * Legal Types
 */

// Represents a section or subsection within a legal document
export interface LegalSection {
  id: string;
  title: string;
  content: string | string[];
  subsections?: LegalSection[];
}

// Represents a complete legal document structure
export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/**
 * Contact Types
 */
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  inquiryType: string
  message: string
}

export interface FormResponse {
  success: boolean
  message: string
  data?: any
}

export interface FormErrors {
  [key: string]: string
}

/**
 * Product Types
 */

// Media types
export interface ProductMedia {
  title?: string;
  src: string;
  type: 'image' | 'video';
}

// Product status and visibility
export type ProductStatus = 'PUBLISHED' | 'DRAFT';
export type ProductGender = 'Ladies' | 'Gents' | 'Unisex';

// Product categories
export type ProductCategory = 'Diamond Jewellery' | 'Gold Jewellery' | 'Ladies Ring';
export type ProductSubCategory =
  | 'Diamond Pendant Set'
  | 'Diamond Ladies Ring'
  | 'Cocktail Ring'
  | 'Ladies Ring'
  | 'Diamond Mangalsutra'
  | 'Diamond Necklace Set'
  | 'Gold Bracelet';

/**
 * Core product interface representing a jewelry item
 * Structured for future backend integration
 */
export interface Product {
  // Basic Information
  id: string;
  status: ProductStatus;
  tagNumber: string;
  itemName: string;
  itemDescription: string;
  slug: string;

  // Media
  thumbnail: string | null;
  itemPhotos: ProductMedia[];
  itemVideo: string | null;

  // Categorization
  itemCategory: ProductCategory;
  itemSubCategory: ProductSubCategory;
  byStyle: string;
  gender: ProductGender;

  // Technical Details
  stamp: string;
  goldStampRate: number;
  tunch: number;
  itemStock: number;

  // Weight Information
  grossWeight: number;
  lessWeight: number;
  netWeight: number;
  wastage: number;
  fine: number;
  diamondWeight: number;
  coloredStoneWeight: number;
  coloredStonePresent: boolean;

  // Cost Breakdown
  laborPercentage: number;
  laborRate: number;
  others: number;
  totalLabor: number;
  totalDiamondCost: number;
  totalColoredStoneCost: number;
  totalGoldCost: number;
  itemMRP: number;

  // Metadata
  createdDate: string; // ISO date string
  updatedDate: string; // ISO date string
  publishDate: string; // ISO date string
  unpublishDate?: string; // ISO date string
  ownerId: string;
}

/**
 * Filter Types
 */

// Filter categories for UI
export type FilterCategory =
  | 'category'
  | 'subCategory'
  | 'gender'
  | 'stamp'
  | 'priceRange'
  | 'stones';

// Individual filter option
export interface FilterOption {
  id: string;
  label: string;
  value: string;
  category: FilterCategory;
}

// Combined filters state
export interface ProductFilters {
  category?: ProductCategory;
  subCategory?: ProductSubCategory;
  gender?: ProductGender;
  minPrice?: number;
  maxPrice?: number;
  byStyle?: string;
  hasColoredStones?: boolean;
}

/**
 * Sort Types
 */
export type SortOption =
  | 'priceLowToHigh'
  | 'priceHighToLow'
  | 'newest'
  | 'popular';

/**
 * Utility Types
 */
export type PriceRange = [number, number];

// API Response types for future backend integration
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Type guard to check if a value is a valid Product
export function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'itemName' in value &&
    'itemCategory' in value
  );
}
