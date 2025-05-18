'use client';

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/types";
import Image from "next/image";
import { useMediaQuery } from 'react-responsive';
import { BREAKPOINTS } from "@/app/lib/constants";

interface ProductCardProps {
  product: Product;
  onWishlist?: () => void;
}

export function ProductCard({ product, onWishlist }: ProductCardProps) {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINTS.mobile });

  return (
    <div className="group">
      <div className="relative w-full rounded-lg overflow-hidden">
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={onWishlist}
          >
            <Heart className="h-4 w-4 stroke-gray-600" />
          </Button>
        </div>
        <div className="aspect-[1/1.1] rounded-lg">
          <div className="relative w-full h-full transition-all duration-300 rounded-lg">
            <div className="absolute inset-0 group-hover:border-2 border-gray-200 rounded-lg z-10" />
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-95 rounded-lg"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority
            />
          </div>
        </div>
      </div>
      <div className="pt-3">
        <h3 className="font-medium text-[15px] text-gray-900 line-clamp-2">
          {product.title}
        </h3>
        <div className="mt-1.5">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-gray-900">
              ₹{product.price.toLocaleString()}
            </p>
            {!isMobile && product.madeToOrder && (
              <p className="text-xs text-gray-500 uppercase tracking-wider ml-3">
                Made to Order
              </p>
            )}
          </div>
          {(isMobile && product.madeToOrder) && (
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Made to Order
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
