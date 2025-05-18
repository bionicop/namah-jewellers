'use client';

import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { type FilterOption, type SortOption, type PaginationState } from '@/app/data/types';
import { ProductCard } from '@/components/product-listing/product-card';
import { ProductFilters } from '@/components/product-listing/product-filters';
import { ProductSort } from '@/components/product-listing/product-sort';
import { Pagination } from '@/components/product-listing/pagination';
import { products } from '@/app/data/products';
import { BREAKPOINTS, ITEMS_PER_PAGE } from '@/lib/constants';

// Memoized ProductCard wrapper for better performance
const MemoizedProductCard = React.memo(ProductCard);

export default function Home() {
  // Media query for responsive design
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.mobile });

  // State management
  const [activeFilters, setActiveFilters] = React.useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = React.useState<SortOption>('popular');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationState>({
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: products.length,
  });

  // Memoized handlers
  const handleFilterChange = React.useCallback((filter: FilterOption) => {
    setActiveFilters(prev => {
      const exists = prev.some(f => f.id === filter.id);
      if (exists) {
        return prev.filter(f => f.id !== filter.id);
      }
      return [...prev, filter];
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const handleFilterRemove = React.useCallback((filterId: string) => {
    setActiveFilters(prev => prev.filter(f => f.id !== filterId));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const handleClearFilters = React.useCallback(() => {
    setActiveFilters([]);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const handleSortChange = React.useCallback((value: SortOption) => {
    setSortBy(value);
  }, []);

  const handlePageChange = React.useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  }, []);

  // Memoized filter and sort computation
  const filteredAndSortedProducts = React.useMemo(() => {
    let result = [...products];

    // Apply filters
    if (activeFilters.length > 0) {
      result = result.filter(product => {
        return activeFilters.every(filter => {
          switch (filter.category) {
            case 'subCategory':
              return product.subCategory === filter.label;
            case 'style':
              return product.style === filter.label;
            case 'gender':
              return product.gender === filter.label;
            case 'stamp':
              return product.stamp === filter.label;
            case 'priceRange':
              const [min, max] = filter.label
                .replace('₹', '')
                .split('-')
                .map(p => parseInt(p.replace(/,/g, ''), 10));
              return product.price >= min && (!max || product.price <= max);
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'priceLowToHigh':
          return a.price - b.price;
        case 'newest':
          return b.id - a.id;
        case 'popular':
        default:
          return 0;
      }
    });
  }, [products, activeFilters, sortBy]);

  // Memoized pagination calculation
  const { paginatedProducts, totalPages } = React.useMemo(() => {
    const total = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
    const items = filteredAndSortedProducts.slice(
      (pagination.currentPage - 1) * ITEMS_PER_PAGE,
      pagination.currentPage * ITEMS_PER_PAGE
    );
    return { paginatedProducts: items, totalPages: total };
  }, [filteredAndSortedProducts, pagination.currentPage]);

  // Memoized result count for header
  const resultCount = React.useMemo(() => {
    const count = filteredAndSortedProducts.length;
    return `${count} ${count === 1 ? 'result' : 'results'}`;
  }, [filteredAndSortedProducts.length]);

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        {/* Header */}
        <div className="pt-6 pb-4">
          <h1 className="text-2xl sm:text-3xl font-serif text-gray-800 tracking-[-0.02em]">
            Gold
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

        {/* Product grid */}
        <div className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
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
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria</p>
            </div>
          )}

          {/* Pagination */}
          {filteredAndSortedProducts.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </main>
  );
}
