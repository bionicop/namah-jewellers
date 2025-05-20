'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Product } from "@/app/data/types";

interface ProductCardProps {
  product: Product;
  onWishlist?: () => void;
}

interface ProductImageProps {
  src: string;
  alt: string;
  isSecondary?: boolean;
}

/**
 * ProductImage component handles image loading and error states
 */
const ProductImage = React.memo(({ src, alt, isSecondary = false }: ProductImageProps) => {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover rounded-lg ${
        isSecondary
          ? "absolute inset-0 transition-transform duration-500 ease-in-out translate-x-full group-hover:translate-x-0"
          : "transition-transform duration-500 ease-out group-hover:scale-[0.95]"
      }`}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      priority={!isSecondary}
      onError={() => setError(true)}
    />
  );
});

ProductImage.displayName = 'ProductImage';

/**
 * ProductCard component displays a single product with image, title, and price
 * Handles hover states and provides links to product details
 */
export function ProductCard({ product, onWishlist }: ProductCardProps): React.ReactElement {
  const hasSecondaryImage = product.itemPhotos.length > 1;
  const productUrl = `/product/${product.tagNumber}`;

  const formattedPrice = React.useMemo(() => {
    return `₹${product.itemMRP.toLocaleString()}`;
  }, [product.itemMRP]);

  return (
    <div className="group">
      {/* Product Image Section */}
      <div className="relative w-full rounded-lg overflow-hidden">
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={onWishlist}
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4 stroke-gray-600" />
          </Button>
        </div>

        <Link href={productUrl} className="block">
          <div className="aspect-[1/1.1] rounded-lg">
            <div className="relative w-full h-full transition-all duration-500 rounded-lg overflow-hidden">
              <div className="absolute inset-0 group-hover:border-2 border-gray-200 rounded-lg z-10" />

              {/* Primary Image */}
              <ProductImage
                src={product.thumbnail || product.itemPhotos[0].src}
                alt={product.itemName}
              />

              {/* Secondary Image (shown on hover) */}
              {hasSecondaryImage && (
                <ProductImage
                  src={product.itemPhotos[1].src}
                  alt={`${product.itemName} - Secondary View`}
                  isSecondary
                />
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Product Details Section */}
      <Link href={productUrl} className="block">
        <div className="pt-3">
          <h3 className="font-medium text-[15px] text-gray-900 line-clamp-2">
            {product.itemName}
          </h3>
          <div className="mt-1.5">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-900">
                {formattedPrice}
              </p>
              {/* Desktop category display */}
              <p className="text-xs text-gray-500 uppercase tracking-wider ml-3 hidden md:block">
                {product.itemCategory}
              </p>
            </div>
            {/* Mobile category display */}
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1 md:hidden">
              {product.itemCategory}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Memoize the main component for better performance
export default React.memo(ProductCard);
