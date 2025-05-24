import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Diamond, Sparkles, Star, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100/50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-300/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <Sparkles className="absolute top-20 left-20 h-6 w-6 text-amber-400 animate-bounce" />
          <Diamond className="absolute top-40 right-32 h-4 w-4 text-amber-500 animate-pulse" />
          <Star className="absolute bottom-32 left-16 h-5 w-5 text-yellow-500 animate-twinkle" />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Crown className="h-20 w-20 text-amber-600 animate-pulse" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-amber-400 animate-spin" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
              Namah
            </span>
            <br />
            <span className="text-4xl md:text-6xl text-gray-800 font-light tracking-wider">
              Jewellers
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Where luxury meets craftsmanship. Discover our exquisite collection of
            <span className="text-amber-600 font-semibold"> handcrafted jewelry </span>
            that celebrates life's precious moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/product" className="flex items-center gap-2">
                Explore Collections
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
