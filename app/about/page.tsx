import Image from 'next/image'
import { Diamond, Crown, Award, Star, Gem, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <section className="bg-white min-h-screen">
    {/* Hero Section */}
    <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl text-navy-900">About Namah</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
                        Welcome to Namah Jewellers, where artistry and elegance come together to create jewellery that transcends time.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 md:gap-12">
                    <div className="relative">
                        <div className="bg-gradient-to-b aspect-square relative rounded-2xl from-amber-200 to-transparent p-px">
                            <Image
                                src="/jewellery_images/jewellery1.jpeg"
                                className="rounded-2xl object-cover w-full h-full"
                                alt="Namah Jewellers Craftsmanship"
                                width={600}
                                height={600}
                            />
                        </div>
                    </div>

                    <div className="relative space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-medium text-navy-900">Our Legacy</h2>
                            <p className="text-gray-600">
                                Inspired by the name Namah—meaning "to bow to Lord Shiva"—we honor tradition, craftsmanship, and devotion in every piece we create.
                            </p>
                        </div>

                        <blockquote className="border-l-4 border-amber-400 pl-4 italic">
                            <p className="text-gray-600">
                                "For us, jewellery is not just an ornament; it's a reflection of your most cherished moments and timeless emotions."
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-white to-amber-50/30">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-medium mb-4 text-navy-900">What Sets Us Apart</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto italic">
                        At Namah Jewellers, we combine traditional craftsmanship with modern innovation to create pieces that tell your unique story.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-white border border-amber-100 hover:border-amber-200 transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Diamond className="size-5 text-amber-500" />
                                    <h3 className="font-medium text-navy-900">Natural Diamonds</h3>
                                </div>
                                <p className="text-sm text-gray-600">Specializing in certified natural diamonds and precious gemstones.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-amber-100 hover:border-amber-200 transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Crown className="size-5 text-amber-500" />
                                    <h3 className="font-medium text-navy-900">Heritage Designs</h3>
                                </div>
                                <p className="text-sm text-gray-600">Blending traditional Indian motifs with contemporary aesthetics.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-amber-100 hover:border-amber-200 transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Award className="size-5 text-amber-500" />
                                    <h3 className="font-medium text-navy-900">Expert Craftsmanship</h3>
                                </div>
                                <p className="text-sm text-gray-600">Each piece crafted by skilled artisans with decades of experience.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-amber-100 hover:border-amber-200 transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Star className="size-5 text-amber-500" />
                                    <h3 className="font-medium text-navy-900">Digital First</h3>
                                </div>
                                <p className="text-sm text-gray-600">Pioneering digital presence with innovative online shopping experience.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-amber-100 hover:border-amber-200 transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Gem className="size-5 text-amber-500" />
                                    <h3 className="font-medium text-navy-900">Custom Designs</h3>
                                </div>
                                <p className="text-sm text-gray-600">Personalized jewelry creation service tailored to your vision.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border border-amber-100 hover:border-amber-200 transition-colors">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="size-5 text-amber-500" />
                                    <h3 className="font-medium text-navy-900">Quality Assured</h3>
                                </div>
                                <p className="text-sm text-gray-600">Every piece certified and guaranteed for authenticity.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* History Section */}
        <section className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-12 sm:grid-cols-2 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-medium text-navy-900">History of Namah</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                Nestled in Karol Bagh, New Delhi, one of India's most iconic jewellery hubs, Namah Jewellers has swiftly earned a name synonymous with quality, trust, and innovation.
                            </p>
                            <p className="text-gray-600">
                                Specialising in natural diamond jewellery and gold creations, we design pieces that celebrate heritage while embracing modern sophistication. From intricate bridal sets to everyday elegance, our collections cater to a wide array of tastes and occasions.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-b aspect-square relative rounded-2xl from-amber-200 to-transparent p-px">
                            <Image
                                src="/jewellery_images/jewellery2.jpeg"
                                className="rounded-2xl object-cover w-full h-full"
                                alt="Namah Jewellers Heritage"
                                width={600}
                                height={600}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </section>
    )
}
