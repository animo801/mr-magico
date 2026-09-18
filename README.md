# Mr. Magico

Next.js + Tailwind site for Mr. Magico: a landing page that funnels into a
multi-step lead quiz, ending in a contact form that sends leads to
GoHighLevel and reports conversions to Facebook (Pixel + Conversions API).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `/` — landing page
- `/quiz/1` — start of the quiz (auto-redirected from `/quiz`)
- `/quiz/contact` — final name/phone/email form
- `/quiz/thank-you` — confirmation page

## Editing content

- **Quiz questions**: [lib/quiz-config.ts](lib/quiz-config.ts) — add, remove, or
  reorder questions here. Each question is either `single-select` (a list of
  options) or `text` (free input). Routes are generated automatically from
  this array.
- **Landing page sections**: [components/landing/](components/landing/) — one
  file per section (Hero, WhyHire, Parents, Reviews, Famous, FAQ, FinalCTA,
  Footer). FAQ content lives in [components/landing/FAQ.tsx](components/landing/FAQ.tsx).

## Images

Real assets exported from the Figma file live in `public/images/` (logo,
hero/party photos, review avatar, celebrity video-thumbnail, star icons). Two
things to know:

- The "honored to have performed for stars" cards (Chris Martin / Mr.
  Wonderful) are real `<video>` players (see
  [components/landing/Famous.tsx](components/landing/Famous.tsx)), using
  `celebrity.png` as the poster image until real video files are added. Drop
  the actual clips into `public/videos/` as `chris-martin.mp4` and
  `mr-wonderful.mp4` and they'll play automatically — no code changes needed.
- The hero's own hero-photo.png crop is an approximation of the design's zoomed
  crop (`object-position` set by eye), not the exact transform math.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | Facebook Pixel ID (client-side tracking) |
| `FACEBOOK_CONVERSIONS_API_TOKEN` | Server-side token for the Conversions API |
| `FACEBOOK_TEST_EVENT_CODE` | Optional — for testing events in Meta's Test Events tool |
| `GHL_WEBHOOK_URL` | Recommended: a GoHighLevel workflow's "Inbound Webhook" URL |
| `GHL_API_KEY` / `GHL_LOCATION_ID` | Alternative to the webhook: calls the GHL API directly |

Set the same variables in Vercel (Project Settings → Environment Variables) before deploying.

### Facebook Pixel + Conversions API

- The pixel base code loads in [app/layout.tsx](app/layout.tsx) via
  [components/FacebookPixel.tsx](components/FacebookPixel.tsx), and fires
  `PageView` on every client-side route change via
  [components/PixelRouteTracker.tsx](components/PixelRouteTracker.tsx).
- On contact-form submit ([app/quiz/contact/page.tsx](app/quiz/contact/page.tsx)),
  a `Lead` event fires client-side via the pixel **and** server-side via
  [app/api/lead/route.ts](app/api/lead/route.ts) →
  [lib/facebook-capi.ts](lib/facebook-capi.ts). Both use the same `event_id`
  so Meta deduplicates them into one event.
- Test events with Meta's Test Events tool by setting `FACEBOOK_TEST_EVENT_CODE`.

### GoHighLevel

Default path ([lib/ghl.ts](lib/ghl.ts)): set `GHL_WEBHOOK_URL` to a GHL
workflow's "Inbound Webhook" trigger URL. Every submission posts JSON with
`firstName`, `phone`, `email`, `source`, `eventSourceUrl`, and the raw quiz
answers (keyed by question id from `lib/quiz-config.ts`) — map those fields
in the workflow.

Alternative: set `GHL_API_KEY` (a Private Integration token) and
`GHL_LOCATION_ID` to call GHL's `contacts/upsert` API directly. This path only
sends name/phone/email/tags — extend `lib/ghl.ts` if you want quiz answers
mapped to specific custom fields in your GHL account.

## Deploying to Vercel

```bash
npx vercel
```

Or connect the repo at [vercel.com/new](https://vercel.com/new). Add the
environment variables above in the Vercel project settings before the first
production deploy.
