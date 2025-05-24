import Image from 'next/image'
import { Diamond, Crown, Award, Star, Gem, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { COMPANY_INFO } from '@/lib/constants'

const FEATURES = [
  {
    icon: 'Diamond',
    title: 'Natural Diamonds',
    description: 'Specializing in certified natural diamonds and precious gemstones.'
  },
  {
    icon: 'Crown',
    title: 'Heritage Designs',
    description: 'Blending traditional Indian motifs with contemporary aesthetics.'
  },
  {
    icon: 'Award',
    title: 'Expert Craftsmanship',
    description: 'Each piece crafted by skilled artisans with decades of experience.'
  },
  {
    icon: 'Star',
    title: 'Digital First',
    description: 'Pioneering digital presence with innovative online shopping experience.'
  },
  {
    icon: 'Gem',
    title: 'Custom Designs',
    description: 'Personalized jewelry creation service tailored to your vision.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Quality Assured',
    description: 'Every piece certified and guaranteed for authenticity.'
  }
]

export default function AboutPage() {
  const iconMap = { Diamond, Crown, Award, Star, Gem, ShieldCheck }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold lg:text-5xl xl:text-6xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent mb-4">
              About {COMPANY_INFO.name}
            </h1>
            <p className="text-base lg:text-lg max-w-3xl mx-auto text-gray-600">
              Welcome to {COMPANY_INFO.name}, where {COMPANY_INFO.tagline.toLowerCase()} to create jewellery that transcends time.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/jewellery_images/jewellery1.jpeg"
                  className="object-cover w-full h-full"
                  alt="NAMAH Jewellers Craftsmanship"
                  width={600}
                  height={750}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold lg:text-4xl text-gray-900">Our Legacy</h2>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Inspired by the name Namah—meaning "to bow to Lord Shiva"—we honor tradition, craftsmanship, and devotion in every piece we create.
                </p>
              </div>

              <blockquote className="border-l-4 border-amber-400 pl-6 bg-amber-50/50 py-4 rounded-r-lg">
                <p className="text-base lg:text-lg text-gray-600 italic">
                  "For us, jewellery is not just an ornament; it's a reflection of your most cherished moments and timeless emotions."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-amber-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold lg:text-4xl mb-4 text-gray-900">What Sets Us Apart</h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              At {COMPANY_INFO.name}, we combine traditional craftsmanship with modern innovation to create pieces that tell your unique story.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap]

              return (
                <Card key={index} className="bg-white border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-amber-500" />
                        <h3 className="text-base lg:text-lg font-medium text-gray-900">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 lg:order-1">
              <h2 className="text-3xl font-semibold lg:text-4xl text-gray-900">History of {COMPANY_INFO.name}</h2>
              <div className="space-y-4">
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Nestled in {COMPANY_INFO.contact.address.split(',')[0]}, one of India's most iconic jewellery hubs, {COMPANY_INFO.name} has swiftly earned a name synonymous with quality, trust, and innovation.
                </p>
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Specialising in natural diamond jewellery and gold creations, we design pieces that celebrate heritage while embracing modern sophistication. From intricate bridal sets to everyday elegance, our collections cater to a wide array of tastes and occasions.
                </p>
              </div>
            </div>

            <div className="relative lg:order-2">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/jewellery_images/jewellery2.jpeg"
                  className="object-cover w-full h-full"
                  alt="NAMAH Jewellers Heritage"
                  width={600}
                  height={750}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
