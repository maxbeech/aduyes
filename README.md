# ADUYes — ADU Feasibility & Cost Calculator

Free accessory dwelling unit (ADU) feasibility checker and cost calculator. Pick your
state, ADU type and size to instantly see what your city's rules allow (size, setbacks,
parking, owner-occupancy) and what a backyard ADU will cost — built from regional
construction-cost indices and published statewide ADU statutes.

**Live:** https://aduyes.vercel.app · **Domain:** aduyes.com (pending)

## SEO strategy

The growth engine is programmatic SEO over an un-saturated long-tail:

- `/[state]` — ADU rules + cost for every U.S. state (e.g. `/california`)
- `/[state]/[city]` — city-level ADU pages (e.g. `/california/los-angeles`)
- `/cost/[type]` — cost-by-type pages (detached, garage conversion, JADU, prefab, attached)
- `/blog/[slug]` — guides targeting researched low-competition keywords
  (`how much does an adu cost`, `garage to adu conversion cost`, `california adu rules`, …)

All pages are statically generated with canonical URLs, JSON-LD (`Article`/`FAQPage`),
`sitemap.xml` and `robots.txt`.

## Monetisation

1. **Builder lead-gen** — refer homeowners to vetted ADU builders (`adu builder` keyword
   carries a ~$21 top-of-page CPC).
2. **Detailed feasibility report** — $49 personalised PDF.
3. **Pro subscription** — for builders/realtors (roadmap).

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
