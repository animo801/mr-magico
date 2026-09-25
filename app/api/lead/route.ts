import { NextRequest, NextResponse } from "next/server";
import { sendFacebookLeadEvent } from "@/lib/facebook-capi";
import { sendLeadToGHL } from "@/lib/ghl";
import { isServiceAreaZip } from "@/lib/service-area-zips";

type LeadRequestBody = {
  firstName?: string;
  phone?: string;
  contactPreference?: string;
  email?: string;
  answers?: Record<string, string>;
  eventId?: string;
  eventSourceUrl?: string;
};

export async function POST(request: NextRequest) {
  const body: LeadRequestBody = await request.json();
  const { firstName, phone, contactPreference, email, answers = {}, eventId, eventSourceUrl } = body;

  if (!firstName || !phone || !contactPreference || !email || !eventId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isServiceAreaZip(answers.location ?? "")) {
    console.warn(`Lead rejected: zip "${answers.location ?? ""}" is outside the service area.`);
    return NextResponse.json({ error: "Outside service area" }, { status: 400 });
  }

  const fbp = request.cookies.get("_fbp")?.value;
  const fbc = request.cookies.get("_fbc")?.value;
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const sourceUrl = eventSourceUrl || request.headers.get("referer") || request.url;

  const [ghlResult, fbResult] = await Promise.allSettled([
    sendLeadToGHL({ firstName, phone, contactPreference, email, answers, eventSourceUrl: sourceUrl }),
    sendFacebookLeadEvent({
      eventId,
      email,
      phone,
      firstName,
      eventSourceUrl: sourceUrl,
      clientIp,
      userAgent,
      fbp,
      fbc,
    }),
  ]);

  if (ghlResult.status === "rejected") {
    console.error("GoHighLevel lead delivery failed:", ghlResult.reason);
  } else {
    console.log("GoHighLevel lead delivery result:", ghlResult.value);
  }
  if (fbResult.status === "rejected") {
    console.error("Facebook Conversions API delivery failed:", fbResult.reason);
  }

  // Always report success to the client: the lead has been received and we
  // don't want a flaky third-party call to block the user's thank-you page.
  return NextResponse.json({ ok: true });
}
