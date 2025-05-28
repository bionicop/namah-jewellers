import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import { type Metadata, type ResolvingMetadata } from "next";
import ProductFeatures from "@/components/product-page/ProductFeatures"
import Image from "next/image";
import AppointmentDialog from "@/components/product-page/AppointmentDialog";
import ImageCarousel from "@/components/product-page/ImageCarousel";

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

  const carouselImages = product.itemPhotos.map((photo, index) => ({
    src: photo.src,
    alt: `${product.itemName} - View ${index + 1}`
  }));

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <ImageCarousel images={carouselImages} />
          </div>

          {/* Product Info */}
          <div className="space-y-4 p-2 sm:p-4 md:p-6 lg:p-8">
            <div>
              <h1 className="text-3xl font-serif text-gray-900">
                {product.itemName}
              </h1>
              <p className="mt-2 text-lg text-gray-500">
                {product.tagNumber}
              </p>
            </div>

            <div className="border-t border-b p-2 sm:p-3 md:p-4 lg:p-5">
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
            <div className="p-2 sm:p-3 md:p-4 lg:p-5">
              <div className="grid grid-cols-2 gap-4 text-sm px-2">
                <div className={'flex flex-row justify-center place-items-center text-md sm:text-lg md:text-xl lg:text-2xl'}>
                  <span><Image src="/animated-logos/coin.gif" width={10} height={10} alt='logo' className={'size-10'} /></span>
                  {product.stamp} karat
                </div>
                <div className={'flex flex-row justify-center place-items-center text-md sm:text-lg md:text-xl lg:text-2xl'}>
                  <span><Image src="/animated-logos/diamond.gif" width={10} height={10} alt='logo' className={'size-10'} /></span>
                  {product.diamondWeight} ct
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium">Product Details</h2>
              <ProductFeatures params={{
                slug: slug
              }} />
            </div>

            <div className={'flex flex-row justify-evenly'}>
              <AppointmentDialog />
            </div>
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