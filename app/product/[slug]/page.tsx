import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import { type Metadata, type ResolvingMetadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Find product by tag number
  const product = products.find(p => p.tagNumber === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  return {
    title: `${product.itemName} | Namah Jewellers`,
    description: product.itemDescription,
    openGraph: {
      title: product.itemName,
      description: product.itemDescription,
      images: [
        {
          url: product.thumbnail || '/jewellery_images/jewellery1.jpeg',
          width: 1200,
          height: 630,
          alt: product.itemName,
        }
      ],
      type: 'website',
      siteName: 'Namah Jewellers',
    },
    alternates: {
      canonical: `/product/${product.tagNumber}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ProductPage({ params: { slug } }: Props) {
  // Find product by slug or tag number for backward compatibility
  const product = products.find(p => p.tagNumber === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 gap-2 h-full">
              {product.itemPhotos.map((photo, index) => (
                <div
                  key={index}
                  className={`relative ${
                    index === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={`${product.itemName} - View ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif text-gray-900">
                {product.itemName}
              </h1>
              <p className="mt-2 text-lg text-gray-500">
                {product.tagNumber}
              </p>
            </div>

            <div className="border-t border-b py-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-2xl font-medium">
                    ₹{product.itemMRP.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-md">{product.itemCategory}</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Product Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Style</p>
                  <p>{product.byStyle || 'Classic'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Gender</p>
                  <p>{product.gender}</p>
                </div>
                <div>
                  <p className="text-gray-500">Gold Stamp</p>
                  <p>{product.stamp}K</p>
                </div>
                <div>
                  <p className="text-gray-500">Net Weight</p>
                  <p>{product.netWeight}g</p>
                </div>
                {product.diamondWeight > 0 && (
                  <div>
                    <p className="text-gray-500">Diamond Weight</p>
                    <p>{product.diamondWeight}ct</p>
                  </div>
                )}
                {product.coloredStoneWeight > 0 && (
                  <div>
                    <p className="text-gray-500">Colored Stone Weight</p>
                    <p>{product.coloredStoneWeight}ct</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {product.itemDescription && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.itemDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  // Pre-generate routes for all products using tag numbers
  return products.map((product) => ({
    slug: product.tagNumber,
  }));
}
