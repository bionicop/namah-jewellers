import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Crown, Diamond, Sparkles, Star, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <Sparkles className="absolute top-20 left-20 h-6 w-6 text-primary animate-bounce" />
          <Diamond className="absolute top-40 right-32 h-4 w-4 text-primary animate-pulse" />
          <Star className="absolute bottom-32 left-16 h-5 w-5 text-primary animate-twinkle" />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Crown className="h-20 w-20 text-primary animate-pulse" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-primary animate-spin" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              Namah
            </span>
            <br />
            <span className="text-4xl md:text-6xl text-secondary font-light tracking-wider">
              Jewellers
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where luxury meets craftsmanship. Discover our exquisite collection of
            <span className="text-primary font-semibold"> handcrafted jewelry </span>
            that celebrates life's precious moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-white px-8 py-4 text-lg font-semibold transition-colors"
            >
              <Link href="/buy" className="flex items-center gap-2">
                Explore Collections
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-gray-50 hover:border-primary/20 px-8 py-4 text-lg font-semibold transition-colors"
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
