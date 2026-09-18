import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";
import PixelRouteTracker from "@/components/PixelRouteTracker";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mr. Magico | Unforgettable Kids' Birthday Party Magic",
  description:
    "Give your kids their most memorable birthday party. Mr. Magico makes your kid the star of the show.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-[#111]">
        <FacebookPixel />
        <Suspense fallback={null}>
          <PixelRouteTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
