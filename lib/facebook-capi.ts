import crypto from "crypto";
import { QUIZ_LEAD_EVENT_NAME } from "@/lib/fpixel";

function sha256(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

type LeadEventPayload = {
  eventId: string;
  email: string;
  phone: string;
  firstName: string;
  eventSourceUrl: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
};

/**
 * Sends the server-side quiz-lead custom event to Facebook's Conversions API.
 * Uses the same event name and event_id as the client-side `fbTrackCustom` call so Meta
 * deduplicates the two into a single event.
 * Requires NEXT_PUBLIC_FACEBOOK_PIXEL_ID and FACEBOOK_CONVERSIONS_API_TOKEN.
 */
export async function sendFacebookLeadEvent(payload: LeadEventPayload) {
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const accessToken = process.env.FACEBOOK_CONVERSIONS_API_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn(
      "Facebook Conversions API is not configured (missing NEXT_PUBLIC_FACEBOOK_PIXEL_ID or FACEBOOK_CONVERSIONS_API_TOKEN); skipping server-side event."
    );
    return { skipped: true };
  }

  const digitsOnlyPhone = payload.phone.replace(/\D/g, "");

  const eventData = {
    event_name: QUIZ_LEAD_EVENT_NAME,
    event_time: Math.floor(Date.now() / 1000),
    event_id: payload.eventId,
    event_source_url: payload.eventSourceUrl,
    action_source: "website",
    user_data: {
      em: [sha256(payload.email)],
      ph: digitsOnlyPhone ? [sha256(digitsOnlyPhone)] : undefined,
      fn: payload.firstName ? [sha256(payload.firstName)] : undefined,
      client_ip_address: payload.clientIp,
      client_user_agent: payload.userAgent,
      fbp: payload.fbp,
      fbc: payload.fbc,
    },
  };

  const body = {
    data: [eventData],
    ...(process.env.FACEBOOK_TEST_EVENT_CODE
      ? { test_event_code: process.env.FACEBOOK_TEST_EVENT_CODE }
      : {}),
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Facebook Conversions API error: ${res.status} ${text}`);
  }

  return res.json();
}
