// Shared navigation configuration for consistent routing across components
export interface NavigationLink {
  name: string;
  href: string;
}

// Main navigation items
export const mainNavigation: NavigationLink[] = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/buy" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

// Footer navigation sections
export const footerNavigation = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/buy" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ],
  services: [
    { name: "Custom Jewelry", href: "/contact" },
    { name: "Jewelry Repair", href: "/contact" },
    { name: "Appraisal Services", href: "/contact" },
    { name: "Consultation", href: "/contact" },
  ],
  policies: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Return Policy", href: "/faq" },
    { name: "Warranty", href: "/faq" },
  ],
} as const;

// Contact information
export const contactInfo = {
  address: "123 Jewelry Street, Diamond District, Mumbai 400001",
  phone: "+91 98765 43210",
  email: "info@namahjewellers.com",
  hours: "Mon - Sat: 10:00 AM - 8:00 PM",
} as const;

// Social media links
export const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/namahjewellers",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/jewelsbynamah",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919876543210",
  },
] as const;
