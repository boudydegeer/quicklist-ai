import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "QuickList AI - AI-Powered Product Listing Optimizer",
  description:
    "Generate optimized product listings for Amazon, Etsy, Shopify, eBay and more using AI. Save hours on copywriting with marketplace-specific optimization.",
  keywords: [
    "product listing",
    "AI",
    "Amazon",
    "Etsy",
    "Shopify",
    "eBay",
    "SEO",
    "optimization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={[inter.variable, "font-sans antialiased"].join(" ")}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
