"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { fbPageview } from "@/lib/fpixel";

/** Fires a Facebook Pixel PageView on every client-side route change (App Router navigations don't reload the base pixel script). */
export default function PixelRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    fbPageview();
  }, [pathname, searchParams]);

  return null;
}
