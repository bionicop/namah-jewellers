'use client';

import React from 'react';
import { useFilters } from '@/components/filters';
import { ProductFilters } from '@/components/filters';
import { ProductCard } from '@/components/product-listing/product-card';
import { ProductSort } from '@/components/product-listing/product-sort';
import { Pagination } from '@/components/product-listing/pagination';
import { Button } from '@/components/ui/button';
import { ITEMS_PER_PAGE, SORT_OPTIONS } from '@/lib/constants';

// Type definitions for better type safety
type SortOption = 'priceLowToHigh' | 'priceHighToLow' | 'newest' | 'popular';

// Memoized ProductCard wrapper for better performance
const MemoizedProductCard = React.memo(ProductCard);

export default function Buy(): React.ReactElement {
  const {
    filteredProducts,
    clearAllFilters,
  } = useFilters();

  // Simple local state
  const [sortBy, setSortBy] = React.useState<SortOption>(SORT_OPTIONS[0].value as SortOption);
  const [page, setPage] = React.useState(1);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Check for mobile on client side
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    checkIsMobile();
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', checkIsMobile);

    return () => mediaQuery.removeEventListener('change', checkIsMobile);
  }, []);

  // Handle sort change
  const handleSortChange = React.useCallback((value: SortOption) => {
    setSortBy(value);
  }, []);

  const handlePageChange = React.useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  // Simple sorting
  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
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
  }, [filteredProducts, sortBy]);

  // Simple pagination
  const { paginatedProducts, totalPages } = React.useMemo(() => {
    const currentPage = page;
    const total = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
    const items = sortedProducts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return { paginatedProducts: items, totalPages: total };
  }, [sortedProducts, page]);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [filteredProducts.length]);

  // Result count
  const resultCountText = React.useMemo(() => {
    const count = filteredProducts.length;
    return `${count} ${count === 1 ? 'result' : 'results'}`;
  }, [filteredProducts.length]);

  return (
    <main className="min-h-screen bg-white w-full flex flex-col">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Header */}
        <div className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold lg:text-5xl xl:text-6xl bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Fine Jewelry
            </h1>
            <p className="text-base lg:text-lg text-gray-600">
              Discover our exquisite collection of {resultCountText}
            </p>
          </div>

        {/* Filters and Sort */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <ProductFilters
              isMobile={isMobile}
              isOpen={isFilterOpen}
              onOpenChange={setIsFilterOpen}
            />
            <ProductSort
              value={sortBy}
              onValueChange={handleSortChange}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Main content area */}
        <div className="w-full flex flex-col">
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 w-full ${
            sortedProducts.length === 0 ? 'hidden' : ''
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
          {sortedProducts.length === 0 && (
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
                  onClick={clearAllFilters}
                  className="mx-auto"
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {sortedProducts.length > 0 && totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          </div>
        </div>
      </div>
    </main>
  );
}
