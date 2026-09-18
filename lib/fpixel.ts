export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function fbPageview() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
}

/** Fires a standard Facebook Pixel event, optionally deduped with a server-side CAPI event via eventId. */
export function fbTrack(
  event: string,
  data?: Record<string, unknown>,
  eventId?: string
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (eventId) {
      window.fbq("track", event, data ?? {}, { eventID: eventId });
    } else {
      window.fbq("track", event, data ?? {});
    }
  }
}
