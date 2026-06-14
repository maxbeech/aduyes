# ADUYes — ADU Feasibility & Cost Calculator

Free accessory dwelling unit (ADU) feasibility checker and cost calculator. Pick your
state, ADU type and size to instantly see what your city's rules allow (size, setbacks,
parking, owner-occupancy) and what a backyard ADU will cost — built from regional
construction-cost indices and published statewide ADU statutes.

**Live:** https://aduyes.vercel.app · **Domain:** aduyes.com (pending)

## SEO strategy

The growth engine is programmatic SEO over an un-saturated long-tail:

- `/[state]` — ADU rules + cost for **all 50 states + DC** (e.g. `/california`)
- `/[state]/[city]` — city-level ADU pages, 240+ cities (e.g. `/california/los-angeles`)
- `/cost/[type]` — cost-by-type pages (detached, garage conversion, JADU, prefab, attached)
- `/blog/[slug]` — guides targeting researched low-competition keywords
  (`how much does an adu cost`, `garage to adu conversion cost`, `california adu rules`, …)
- `/methodology` — transparency/trust page on how every estimate is derived

All pages are statically generated with canonical URLs, JSON-LD (`Article`/`FAQPage` +
`BreadcrumbList`), a dynamic Open Graph image (`next/og`), `sitemap.xml` and `robots.txt`.
Page-template meta titles/descriptions live in `lib/seo.ts` (single source of truth) and
are length-guarded by tests for every route.

## Calculator features

- Cost estimate by state × ADU type × size, with a **hard / soft / site cost breakdown**
- **Feasibility flags** (size, setbacks, parking, owner-occupancy, approval time, impact
  fees, and a **lot-coverage** check from the lot-size input) with statute citations
- **Rental income & ROI** estimate (`lib/income.ts`): monthly rent range, gross yield and
  simple payback from the build cost

## Monetisation

1. **Builder lead-gen** — refer homeowners to vetted ADU builders (`adu builder` keyword
   carries a ~$21 top-of-page CPC).
2. **Detailed feasibility report** — $49. Captured via the `ReportForm` component.
3. **Pro subscription** — for builders/realtors (roadmap).

### Lead capture (current vs. upgrade)

`components/ReportForm.tsx` currently composes a **real prefilled email** to the ADUYes
inbox via the visitor's mail client — honest (the lead only sends when they hit send), with
no fake "submitted" state and zero backend. **Upgrade path** (external, requires provisioning):
add a Vercel Function (`app/api/lead/route.ts`) that writes leads to a datastore
(Vercel Postgres / KV) and notifies via an email API (e.g. Resend) — needs the datastore +
`RESEND_API_KEY` env set in Vercel. Until then the mailto flow is the honest MVP.

## Vercel / free-tier strategy

Every page is **statically generated (SSG)** at build time from in-repo data and served as
immutable assets from Vercel's CDN — **zero function invocations and minimal Fast Origin
Transfer**, which is strictly more free-tier-optimal than ISR here. ISR/`revalidate` is
deliberately *not* used: the content has no external data source, so re-rendering on a
schedule would only burn invocations for an identical result. If a CMS is added later,
switch blog/state pages to ISR with a long `revalidate` (e.g. 1 week).

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · deployed on Vercel. The calculator
is pure client-side math (`lib/cost.ts`, `lib/feasibility.ts`, `lib/states.ts`) — no DB
required for the free tier.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # cost + feasibility + data-integrity unit tests
npm run build    # static export of all programmatic pages
```

## Data & disclaimers

Cost figures are planning estimates from 2024–2025 ADU cost ranges scaled by a regional
cost index. Rule data reflects statewide ADU statutes (cited per state). Always confirm
with your city planning department and a licensed contractor before relying on any output.
