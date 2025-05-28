import type { Metadata } from "next";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Namah Jewellers - Luxury Jewelry Collection",
  description: "Discover exquisite handcrafted jewelry at Namah Jewellers. Premium diamonds, gold, and precious stones in stunning designs.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50/30">
        <NuqsAdapter>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
