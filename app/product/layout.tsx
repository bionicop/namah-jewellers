import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px]">
          <div className="flex items-center h-16">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              asChild
            >
              <Link href="/buy" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Shop</span>
              </Link>
            </Button>

            {/* Breadcrumbs */}
            <div className="flex items-center text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <Link href="/buy" className="text-gray-500 hover:text-gray-900">
                Shop
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <span className="text-gray-900 font-medium truncate">
                Product Details
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {children}
    </div>
  );
}
