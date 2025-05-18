import { Product, FilterOption, FilterCategory } from "./types";
import {
  SUB_CATEGORIES,
  STYLES,
  GENDERS,
  STAMPS,
  PRODUCT_IMAGES,
  POPULAR_FILTERS,
} from "@/lib/constants";

// Convert readonly arrays to regular arrays for randomItem function
const subCategories = [...SUB_CATEGORIES];
const styles = [...STYLES];
const genders = [...GENDERS];
const stamps = [...STAMPS];
const images = [...PRODUCT_IMAGES];

// Helper function to get random item from array
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate random price
const randomPrice = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Generate 15 dummy products
export const products: Product[] = Array.from({ length: 15 }, (_, i) => {
  const subCategory = randomItem(subCategories);
  const style = randomItem(styles);
  const price = randomPrice(25000, 150000);

  return {
    id: i + 1,
    title: `${style} Gold ${subCategory}`,
    description: `Beautiful ${style.toLowerCase()} design crafted in ${randomItem(stamps)} gold`,
    category: 'Gold',
    subCategory,
    style,
    gender: randomItem(genders),
    price,
    stamp: randomItem(stamps),
    image: images[i % images.length], // Cycle through available images
    madeToOrder: Math.random() > 0.3, // 70% items are made to order
  };
});

// Filter options for UI with proper typing
export const filterOptions: Record<FilterCategory, FilterOption[]> = {
  subCategory: subCategories.map(sub => ({ id: sub.toLowerCase(), label: sub, category: 'subCategory' })),
  style: styles.map(style => ({ id: style.toLowerCase(), label: style, category: 'style' })),
  gender: genders.map(gender => ({ id: gender.toLowerCase(), label: gender, category: 'gender' })),
  priceRange: ['25k-50k', '50k-100k', '100k+'].map(range => ({
    id: range.toLowerCase(),
    label: range,
    category: 'priceRange'
  })),
  stamp: stamps.map(stamp => ({ id: stamp.toLowerCase(), label: stamp, category: 'stamp' })),
};

export { POPULAR_FILTERS };
