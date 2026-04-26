// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  
  title: {
    template: "%s | Qalbin Saliim Charity Organisation",
    default: "Qalbin Saliim Organisation | Loving and Caring Heart",
  },
  description: "Empowering underserved communities across Africa through clean water, food, education, healthcare, and sustainable development. Donate, volunteer, or partner with us today.",
  
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "Qalbin Saliim Organisation",
    title: "Qalbin Saliim Organisation | Loving and Caring Heart",
    description: "Empowering underserved communities across Africa through clean water, food, education, healthcare, and sustainable development.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Qalbin Saliim community impact" }],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Qalbin Saliim Organisation",
    description: "Empowering underserved communities across Africa through clean water, food, education, healthcare, and sustainable development.",
    images: ["/og-image.jpg"],
    creator: "@sufiyantechnologies",
  },
  
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-icon.png",
    shortcut: "/icons/favicon-16x16.png",
  },
  
  verification: {
    google: "HAoRsMkljiXi5Rjw6atpr4q5lDZ0uKHiwj5E-BhlUzU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}