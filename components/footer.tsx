import { COMPANY_INFO } from '@/lib/constants'
import Link from 'next/link';

const FOOTER_LINKS = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/privacy', label: 'Privacy Policy' }
  ],
  products: [
  { href: '/', label: 'Rings' },
  { href: '/', label: 'Necklaces' },
  { href: '/', label: 'Earrings' },
  { href: '/', label: 'Bracelets' },
  { href: '/', label: 'Pendants' },
  { href: '/', label: 'Bangles' }
  ]
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              {COMPANY_INFO.name}
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {COMPANY_INFO.description}
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{COMPANY_INFO.contact.address}</p>
              <p>{COMPANY_INFO.contact.phone}</p>
              <p>{COMPANY_INFO.contact.email}</p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Collections</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
                </svg>
              </Link>
              <Link
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 {COMPANY_INFO.name}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
