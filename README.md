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
- **Metro-level cost adjustment** on city pages (`cityCostMultiplier` in `lib/cost.ts`) so
  e.g. San Francisco reads higher than the California average — distinct, accurate city pages
- **Feasibility flags** (size, setbacks, parking, owner-occupancy, approval time, impact
  fees, and a **lot-coverage** check from the lot-size input) with statute citations
- **Rental income, ROI & financing** (`lib/income.ts`): monthly rent range, gross yield,
  simple payback, and an amortized **monthly loan payment** on the build cost
- **Shareable results** — the home calculator reads inputs from the URL query and reflects
  changes back (`?state=&type=&size=&lot=`), so an estimate is bookmarkable/shareable

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

Every route is prerendered at build and uses **ISR with a 1-week `revalidate`** (`604800`s,
set on each route segment). Pages are served from Vercel's **edge cache** (`x-vercel-cache:
PRERENDER`) as prerendered HTML with immutable static assets (`max-age=31536000, immutable`)
— minimal Fast Origin Transfer, near-zero origin compute. The long revalidation window means
each page regenerates at most once/week (negligible invocations) while staying fresh if the
underlying data changes and the app is redeployed. There are **no runtime external/API
calls** (the calculator is pure client-side math), so there are no API failure modes to
handle.

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
