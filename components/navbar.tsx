"use client"

import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, User, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateBuyPageUrl, generateCategoryUrl } from "@/lib/navigation"

interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface JewelryCategory {
  title: string
  items: string[]
}

const TOP_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
] as const

const JEWELRY_CATEGORIES: JewelryCategory[] = [
  {
    title: "All Jewellery",
    items: [
      "Bangles", "Bracelets", "Earrings", "Gold Chains", "Pendants",
      "Rings", "Engagement Rings", "Necklaces", "Nose Pins", "Kadas", "Mangalsutras", "Jhumkas"
    ]
  },
  {
    title: "Gold Jewellery",
    items: [
      "Mangalsutra Chain 18 KT", "Mangalsutra Chain 14 KT", "Gold Necklace",
      "Gold Bangles", "Gold Chains", "Gold Rings", "Gold Earrings"
    ]
  },
  {
    title: "Diamond Jewellery",
    items: [
      "Diamond Rings", "Diamond Necklaces", "Diamond Earrings",
      "Diamond Pendants", "Diamond Bangles", "Diamond Bracelets"
    ]
  }
] as const

const CATEGORY_ICONS = {
  "All Jewellery": (
    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
  ),
  "Gold Jewellery": (
    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
    </svg>
  ),
  "Diamond Jewellery": (
    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
    </svg>
  )
} as const

const NAV_ICONS = {
  Home: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ),
  Collections: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  FAQ: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  Contact: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  )
} as const

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Memoized callbacks to prevent re-renders
  const toggleMobile = useCallback(() => setIsMobileOpen(prev => !prev), [])
  const closeMobile = useCallback(() => setIsMobileOpen(false), [])
  const setDropdown = useCallback((category: string | null) => setActiveDropdown(category), [])

  // Auto-close on outside click and scroll
  useEffect(() => {
    if (!isMobileOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeMobile()
      }
    }

    const handleScroll = () => closeMobile()
    const handleEscape = (event: KeyboardEvent) => event.key === 'Escape' && closeMobile()

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMobileOpen, closeMobile])

  // Memoized active category data
  const activeCategory = useMemo(() =>
    JEWELRY_CATEGORIES.find(cat => cat.title === activeDropdown),
    [activeDropdown]
  )

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
        {/* Main Navigation */}
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Namah Jewellers"
              width={160}
              height={50}
              className="h-24 w-auto"
              priority
              style={{
                filter: "brightness(0) saturate(100%) invert(73%) sepia(55%) saturate(1000%) hue-rotate(15deg) brightness(95%) contrast(85%)"
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {TOP_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary relative group transition-colors"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative" aria-label="Wishlist">
              <Heart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="User account">
              <User className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 lg:hidden transition-transform duration-200 hover:scale-105"
              onClick={toggleMobile}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              <div className="relative w-4 h-4">
                <Menu className={`h-4 w-4 absolute transition-all duration-300 ${isMobileOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'}`} />
                <X className={`h-4 w-4 absolute transition-all duration-300 ${isMobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <div className="hidden lg:block bg-gray-50 border-t relative">
          <div className="flex items-center justify-center px-6">
            {JEWELRY_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="relative"
                onMouseEnter={() => setDropdown(category.title)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-white transition-colors"
                  aria-expanded={activeDropdown === category.title}
                >
                  {category.title}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Mega Menu */}
          {activeDropdown && activeCategory && (
            <div
              className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50"
              onMouseEnter={() => setDropdown(activeDropdown)}
              onMouseLeave={() => setDropdown(null)}
            >
              <div className="p-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="col-span-1">
                    <h3 className="text-xl font-semibold text-primary mb-3">{activeDropdown}</h3>
                    <p className="text-sm text-gray-600">
                      Explore our exquisite collection of {activeDropdown.toLowerCase()}.
                    </p>
                  </div>
                  <div className="col-span-3">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {activeCategory.items.map((item) => (
                        <Link
                          key={item}
                          href={generateBuyPageUrl(activeDropdown, item)}
                          className="text-sm text-gray-600 hover:text-primary p-3 rounded hover:bg-gray-50 transition-colors border border-gray-100 hover:border-primary/20"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        {isMobileOpen && (
          <div className="absolute top-full left-0 right-0 lg:hidden bg-white border-t shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
            <nav className="px-6 py-4 space-y-4" role="navigation" aria-label="Mobile navigation">
              {TOP_NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center text-base font-medium text-gray-700 hover:text-primary py-3 border-b border-gray-100 last:border-b-0 transition-all duration-200 hover:translate-x-1"
                  onClick={closeMobile}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-6 h-6 mr-3 flex items-center justify-center">
                    {NAV_ICONS[item.label as keyof typeof NAV_ICONS]}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Circular Categories */}
      <div className="lg:hidden bg-white border-t py-4">
        <div className="px-4">
          <div className="flex justify-center space-x-6 overflow-x-auto scrollbar-hide">
            {JEWELRY_CATEGORIES.map((category) => (
              <Link
                key={category.title}
                href={generateCategoryUrl(category.title)}
                className="flex-shrink-0 flex flex-col items-center space-y-2 group min-w-[80px]"
                aria-label={`Browse ${category.title}`}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary flex items-center justify-center shadow-lg group-active:scale-95 transition-all duration-300 group-hover:scale-105 mx-auto">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                    {CATEGORY_ICONS[category.title as keyof typeof CATEGORY_ICONS]}
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight w-full">
                  {category.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
