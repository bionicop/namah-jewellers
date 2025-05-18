'use client';

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        // Show first 5 pages, ellipsis, last page
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page, ellipsis, last 5 pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    } else {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-1 my-8">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            className={`h-8 w-8 rounded-full ${
              currentPage === page ? 'bg-gray-900 text-white' : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2">...</span>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
