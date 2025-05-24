"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  ShoppingBag,
  Search,
  Heart,
  User,
  Diamond,
  Sparkles,
  Crown
} from "lucide-react"
import { mainNavigation } from "@/lib/navigation"

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gold-200/20"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Crown className="h-8 w-8 text-amber-600 group-hover:text-amber-700 transition-colors duration-300" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-amber-400 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Namah
                </span>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                  Jewellers
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Main Navigation */}
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300 group",
                  pathname === item.href
                    ? "text-amber-600"
                    : "text-gray-700 hover:text-amber-600"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 transition-all duration-300",
                  pathname === item.href
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex h-11 w-11 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all duration-300 group border border-transparent hover:border-amber-200/50 shadow-sm hover:shadow-md"
            >
              <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="sr-only">Search Jewelry</span>
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex h-11 w-11 text-gray-600 hover:text-red-500 hover:bg-red-50/80 rounded-xl transition-all duration-300 relative group border border-transparent hover:border-red-200/50 shadow-sm hover:shadow-md"
            >
              <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg">
                2
              </span>
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all duration-300 relative group border border-transparent hover:border-amber-200/50 shadow-sm hover:shadow-md"
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-amber-600 to-yellow-600 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg">
                3
              </span>
              <span className="sr-only">Shopping cart</span>
            </Button>

            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex h-11 w-11 text-gray-600 hover:text-amber-600 hover:bg-amber-50/80 rounded-xl transition-all duration-300 group border border-transparent hover:border-amber-200/50 shadow-sm hover:shadow-md"
            >
              <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="sr-only">My Account</span>
            </Button>

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-10 w-10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col space-y-8 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 px-4">
                    <Crown className="h-8 w-8 text-amber-600" />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        Namah Jewellers
                      </span>
                      <span className="text-xs text-muted-foreground tracking-widest">
                        LUXURY COLLECTION
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4 px-4">
                    {/* Main Navigation */}
                    {mainNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300",
                          pathname === item.href
                            ? "bg-amber-50 text-amber-600 border-l-4 border-amber-600"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                        )}
                      >
                        <Diamond className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="px-4 pt-8 border-t border-gray-200">
                    <div className="flex flex-col space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left h-12 border-amber-200 hover:bg-amber-50 rounded-xl"
                      >
                        <User className="h-5 w-5 mr-3" />
                        My Account
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left h-12 border-amber-200 hover:bg-amber-50 rounded-xl"
                      >
                        <Search className="h-5 w-5 mr-3" />
                        Search Jewelry
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left h-12 border-amber-200 hover:bg-amber-50 rounded-xl relative"
                      >
                        <Heart className="h-5 w-5 mr-3" />
                        Wishlist
                        <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          2
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
