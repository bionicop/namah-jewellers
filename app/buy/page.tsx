'use client';

import React from 'react';
import { useQueryState, type UseQueryStateOptions } from 'nuqs';
import { type FilterOption, type Product, type ProductCategory, type ProductSubCategory } from '@/app/data/types';
import { ProductCard } from '@/components/product-listing/product-card';
import { ProductFilters } from '@/components/product-listing/product-filters';
import { ProductSort } from '@/components/product-listing/product-sort';
import { Pagination } from '@/components/product-listing/pagination';
import { Button } from '@/components/ui/button';
import { products } from '@/app/data/products';
import { ITEMS_PER_PAGE, SORT_OPTIONS } from '@/lib/constants';

// Type definitions for better type safety
type SortOption = 'priceLowToHigh' | 'priceHighToLow' | 'newest' | 'popular';
type FilterCategory = 'category' | 'subCategory' | 'gender' | 'stamp' | 'priceRange' | 'stones';

// Memoized ProductCard wrapper for better performance
const MemoizedProductCard = React.memo(ProductCard);

/**
 * Buy page component for displaying and filtering products
 * Handles product filtering, sorting, and pagination with URL state management
 */
export default function Buy(): React.ReactElement {
  // URL state management with nuqs
  const [activeFilters, setActiveFilters] = useQueryState<FilterOption[]>('filters', {
    parse: (value): FilterOption[] => {
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return [];
      }
    },
    serialize: (value) => encodeURIComponent(JSON.stringify(value)),
    defaultValue: [],
  });

  const [sortBy, setSortBy] = useQueryState<SortOption>('sort', {
    parse: (value): SortOption => {
      return value as SortOption;
    },
    serialize: (value) => value,
    defaultValue: SORT_OPTIONS[0].value as SortOption,
  });

  const [page, setPage] = useQueryState('page', {
    defaultValue: '1',
  });

  // Local state for mobile filter drawer
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  // Filter handlers
  const handleFilterChange = React.useCallback((filter: FilterOption) => {
    setActiveFilters(prev => {
      const exists = prev.some(f => f.id === filter.id);
      if (exists) {
        return prev.filter(f => f.id !== filter.id);
      }
      return [...prev, filter];
    });
    setPage('1');
  }, [setActiveFilters, setPage]);

  const handleFilterRemove = React.useCallback((filterId: string) => {
    setActiveFilters(prev => prev.filter(f => f.id !== filterId));
    setPage('1');
  }, [setActiveFilters, setPage]);

  const handleClearFilters = React.useCallback(() => {
    setActiveFilters([]);
    setPage('1');
  }, [setActiveFilters, setPage]);

  const handleSortChange = React.useCallback((value: SortOption) => {
    setSortBy(value);
  }, [setSortBy]);

  const handlePageChange = React.useCallback((newPage: number) => {
    setPage(newPage.toString());
  }, [setPage]);

  // Product filtering logic
  const applyFilter = React.useCallback((product: Product, filter: FilterOption): boolean => {
    switch (filter.category as FilterCategory) {
      case 'category':
        return product.itemCategory === filter.value;
      case 'subCategory':
        return product.itemSubCategory === filter.value;
      case 'gender':
        return product.gender === filter.value;
      case 'stamp':
        return product.stamp === filter.value;
      case 'priceRange':
        if (filter.value.includes('-')) {
          const [minStr, maxStr] = filter.value.split('-');
          const min = parseInt(minStr.replace(/\D/g, ''), 10);
          const max = maxStr ? parseInt(maxStr.replace(/\D/g, ''), 10) : Number.MAX_SAFE_INTEGER;
          return product.itemMRP >= min && product.itemMRP <= max;
        }
        // Legacy price range handling
        switch (filter.value) {
          case '0-50k':
            return product.itemMRP < 50000;
          case '50k-100k':
            return product.itemMRP >= 50000 && product.itemMRP <= 100000;
          case '100k+':
            return product.itemMRP > 100000;
          default:
            return true;
        }
      case 'stones':
        return filter.id === 'colored-stones'
          ? product.coloredStonePresent
          : product.diamondWeight > 0;
      default:
        return true;
    }
  }, []);

  // Memoized filter and sort computation
  const filteredAndSortedProducts = React.useMemo(() => {
    let result = [...products];

    // Apply filters
    if (activeFilters.length > 0) {
      result = result.filter(product =>
        activeFilters.every(filter => applyFilter(product, filter))
      );
    }

    // Apply sorting
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'priceLowToHigh':
          return a.itemMRP - b.itemMRP;
        case 'priceHighToLow':
          return b.itemMRP - a.itemMRP;
        case 'newest':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'popular':
        default:
          return 0;
      }
    });
  }, [products, activeFilters, sortBy, applyFilter]);

  // Memoized pagination calculation
  const { paginatedProducts, totalPages } = React.useMemo(() => {
    const currentPage = parseInt(page, 10);
    const total = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
    const items = filteredAndSortedProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return { paginatedProducts: items, totalPages: total };
  }, [filteredAndSortedProducts, page]);

  // Memoized result count
  const resultCount = React.useMemo(() => {
    const count = filteredAndSortedProducts.length;
    return `${count} ${count === 1 ? 'result' : 'results'}`;
  }, [filteredAndSortedProducts.length]);

  return (
    <main className="min-h-screen bg-white w-full flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full flex-1">
        {/* Header */}
        <div className="pt-6 pb-4">
          <h1 className="text-2xl sm:text-3xl font-serif text-gray-800 tracking-[-0.02em]">
            Fine Jewelry
            <span className="text-base font-sans text-gray-500 ml-2">
              {resultCount}
            </span>
          </h1>
        </div>

        {/* Filters and Sort */}
        <div className="py-4">
          <div className="flex items-center justify-between gap-4">
            <ProductFilters
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onFilterRemove={handleFilterRemove}
              onClearFilters={handleClearFilters}
              isMobile={window.matchMedia(`(max-width: 768px)`).matches}
              isOpen={isFilterOpen}
              onOpenChange={setIsFilterOpen}
            />
            <ProductSort
              value={sortBy}
              onValueChange={handleSortChange}
              isMobile={window.matchMedia(`(max-width: 768px)`).matches}
            />
          </div>
        </div>

        {/* Main content area */}
        <div className="py-6 w-full flex flex-col">
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 w-full ${
            filteredAndSortedProducts.length === 0 ? 'hidden' : ''
          }`}>
            {paginatedProducts.map((product) => (
              <MemoizedProductCard
                key={product.id}
                product={product}
                onWishlist={() => {}}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="w-full py-12">
              <div className="max-w-md mx-auto text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any products matching your selected filters. Try adjusting your filters or start fresh.
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="mx-auto"
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {filteredAndSortedProducts.length > 0 && totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={parseInt(page, 10)}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
