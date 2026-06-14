# ADUYes — Testing & Validation Coverage

_Last verified: 2026-06-14._

## Automated (`npm test` — 3,909 assertions, all passing)

- **Cost engine** (`lib/cost.ts`): per-state × per-type math, monotonicity, type ordering,
  clamping, regional index, **city metro multiplier**, and **sane-bounds checks across every
  state × type × size** (no estimate outside $20k–$800k / $50–$600 per sq ft).
- **Feasibility** (`lib/feasibility.ts`): verdict for every state, all flag types, lot-coverage.
- **Rent / ROI / financing** (`lib/income.ts`): rent bounds per state, gross yield, payback,
  amortized loan payment (incl. 0% and 0-principal edge cases).
- **Content / data integrity** (`lib/posts.ts`, `lib/states.ts`, `lib/seo.ts`): unique slugs/
  keywords, meta-length limits for **every route**, statute-citation accuracy guards, **every
  blog CTA resolves to a real route**, every city slug round-trips, no city-slug collisions.
- **Lead routing security** (`lib/lead.ts`): XSS (`<script>`), SQL-ish, and unicode payloads
  are URL-encoded (never raw `< > "`); strict email validation; long-input handling.

## E2E browser-verified (live, via Haiku agent + direct MCP)

Continuous user journey + isolated checks, all PASS:
- Calculator reactivity (state/type/size/lot/checkboxes recompute cost, breakdown, feasibility, ROI)
- **Shareable links** restore inputs from `?state=&type=&size=&lot=`; URL writes back on change
- **Lead form**: fills, native + JS email validation, **submit reaches the sent-state**
  ("Your email app should now be open…"); XSS in fields renders as plain text (no alert)
- Keyboard focusability of form controls; WCAG 2.1 AA via **axe-core = 0 violations** (home/state/blog)
- Multi-page nav by real clicks: home → /states → state → city → blog → /#report
- **Mobile (390px)**: no horizontal overflow; calculator + form work
- Performance: TTFB ~20ms, FCP ~328ms, 197KB compressed first-load JS; **30 concurrent
  requests → 30×200, avg 0.6s**

## Deliberately not load-tested at scale
The site is fully static + ISR served from Vercel's global edge CDN. High-RPS load testing
would exercise Vercel's CDN, not our code, and provides no signal — the concurrency burst
above confirms consistent edge delivery.

## MUST be manually tested (impossible in this harness)

1. **Lead-form mail-client open** — clicking "Request my report" with a valid email sets the
   sent-state (proven) and assigns a `mailto:` URL; a headless browser has no mail client, so
   confirm on a real device that your email app opens prefilled.
2. **Cross-browser (Safari / Firefox / Edge)** — only Chromium is available here. The app uses
   only standards-based APIs (URLSearchParams, history.replaceState, FormData, mailto, CSS
   Tailwind autoprefixed) with no Chromium-only features; verify rendering on the other engines.
3. **Screen readers (VoiceOver / NVDA / JAWS)** — axe-core covers programmatic semantics
   (labels, roles, names, contrast); do a manual pass with a real screen reader for flow/announcements.
