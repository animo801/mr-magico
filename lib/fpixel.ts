export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

/**
 * Custom event fired when someone submits the quiz contact form. The browser
 * pixel and the server-side Conversions API must use this exact name (plus a
 * shared event_id) or Meta won't dedupe them.
 */
export const QUIZ_LEAD_EVENT_NAME = "Quiz Lead Submitted";

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

/** Fires a custom Facebook Pixel event (non-standard name), deduped with CAPI via eventId. */
export function fbTrackCustom(
  event: string,
  data?: Record<string, unknown>,
  eventId?: string
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (eventId) {
      window.fbq("trackCustom", event, data ?? {}, { eventID: eventId });
    } else {
      window.fbq("trackCustom", event, data ?? {});
    }
  }
}
