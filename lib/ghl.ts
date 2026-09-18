type Lead = {
  firstName: string;
  phone: string;
  email: string;
  answers: Record<string, string>;
  eventSourceUrl: string;
};

/**
 * Sends the lead to GoHighLevel.
 *
 * Preferred setup: create a workflow in GHL with an "Inbound Webhook" trigger,
 * copy its URL into GHL_WEBHOOK_URL, and every field below (including the raw
 * quiz answers) arrives as JSON you can map into workflow fields — no API key
 * needed.
 *
 * Fallback: if GHL_API_KEY (a Private Integration token) and GHL_LOCATION_ID
 * are set instead, this calls the GHL v2 "upsert contact" API directly. That
 * path only sends name/phone/email/tags — map quiz answers to your account's
 * real custom-field keys yourself before relying on it.
 */
export async function sendLeadToGHL(lead: Lead) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: lead.firstName,
        phone: lead.phone,
        email: lead.email,
        source: "Mr. Magico Quiz",
        eventSourceUrl: lead.eventSourceUrl,
        ...lead.answers,
      }),
    });

    if (!res.ok) {
      throw new Error(`GHL webhook error: ${res.status} ${await res.text()}`);
    }
    return { method: "webhook" as const };
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (apiKey && locationId) {
    const res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: process.env.GHL_API_VERSION ?? "v3",
      },
      body: JSON.stringify({
        locationId,
        firstName: lead.firstName,
        phone: lead.phone,
        email: lead.email,
        tags: ["mr-magico-quiz"],
        source: "Mr. Magico Quiz",
      }),
    });

    if (!res.ok) {
      throw new Error(`GHL API error: ${res.status} ${await res.text()}`);
    }
    return { method: "api" as const };
  }

  console.warn(
    "GoHighLevel is not configured (set GHL_WEBHOOK_URL, or GHL_API_KEY + GHL_LOCATION_ID); skipping."
  );
  return { method: "skipped" as const };
}
