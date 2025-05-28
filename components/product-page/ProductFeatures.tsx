import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ChartBarIncreasingIcon, Database, Fingerprint, IdCard, Weight, Gem } from 'lucide-react'
import { products } from "@/app/data/products";
import { type Metadata, type ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

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

export default function Features({ params: { slug } }: Props) {
    const product = products.find(p => p.tagNumber === slug);

    if (!product) {
        notFound();
    }
    type ImageKey = 'item-1' | 'item-2' | 'item-3' | 'item-4'

    return (
        <section className="px-2 sm:px-3 md:px-4 lg:px-5 ">
            <div className="grid ">
                <Accordion
                    type="single"
                    className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 text-base">
                                <Weight className="size-4" />
                                Metal Details
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                
                                <div>
                                    <p className="text-gray-500">Gold Stamp</p>
                                    <p>{product.stamp}K</p>
                                </div>
                                
                                <div>
                                    <p className="text-gray-500">Net Weight</p>
                                    <p>{product.netWeight}g</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 text-base">
                                <Fingerprint className="size-4" />
                                Diamond Details
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className = {'grid grid-cols-2 '}>
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
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 text-base">
                                <IdCard className="size-4" />
                                General Details
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className = {'grid grid-cols-2 '}>
                                <div>
                                    <p className="text-gray-500">Style</p>
                                    <p>{product.byStyle || 'Classic'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-gray-500">Gender</p>
                                    <p>{product.gender}</p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 text-base">
                                <ChartBarIncreasingIcon className="size-4" />
                                Description
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {product.itemDescription}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export function generateStaticParams() {
  // Pre-generate routes for all products using tag numbers
  return products.map((product) => ({
    slug: product.tagNumber,
  }));
}