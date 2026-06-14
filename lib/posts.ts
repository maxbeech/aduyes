// Blog posts powering the SEO content layer. Each post targets a researched,
// low-competition long-tail keyword in the ADU cluster. New posts are appended
// here (Stage 4 weekly content). Content is structured (no raw HTML) and rendered
// safely by the blog template.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cta"; text: string; href: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  date: string; // YYYY-MM-DD
  readingMinutes: number;
  blocks: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "how-much-does-an-adu-cost",
    title: "How Much Does an ADU Cost in 2026? Real Numbers by Type and State",
    description:
      "What an ADU actually costs in 2026 — by construction type (detached, garage conversion, JADU, prefab) and by region, plus the hidden soft costs people forget.",
    keyword: "how much does an adu cost",
    date: "2026-06-14",
    readingMinutes: 7,
    blocks: [
      { type: "p", text: "An ADU is one of the largest discretionary purchases a homeowner ever makes, and the price range is famously wide — anywhere from $60,000 for a simple garage conversion to over $400,000 for a large detached unit in a high-cost market. The number you'll actually pay comes down to three things: the construction type, the size, and where you live." },
      { type: "h2", text: "The single biggest factor: construction type" },
      { type: "p", text: "Per square foot, the type of ADU you build matters more than almost anything else, because it determines how much new structure you're paying for." },
      { type: "ul", items: [
        "Junior ADU (JADU): $100–$180/sq ft. Carved out of your existing home (up to 500 sq ft), so you reuse the foundation, walls and roof.",
        "Garage conversion: $120–$220/sq ft. The shell already exists; you add insulation, plumbing, a kitchen and a bathroom.",
        "Prefab / modular: $180–$300/sq ft including delivery and site work. Factory-built and fast.",
        "Attached addition: $200–$330/sq ft. Shares a wall with the main house.",
        "Detached new build: $220–$360/sq ft. Everything is new — the most flexible and the most expensive.",
      ]},
      { type: "h2", text: "Then multiply by your region" },
      { type: "p", text: "Construction labor and materials cost far more in California, Hawaii, Massachusetts and New York than in Texas, Georgia or Tennessee. A detached ADU that runs $250/sq ft nationally can be $310+/sq ft in coastal California and under $230/sq ft in the South. Our calculator applies a regional cost index for every state so your estimate reflects local pricing." },
      { type: "h2", text: "Don't forget soft costs" },
      { type: "p", text: "Roughly 15–20% of a turnkey ADU budget is 'soft costs': architectural design, structural engineering, permit and plan-check fees, utility connections and impact fees. In California, ADUs under 750 sq ft are exempt from impact fees, which can save several thousand dollars — one reason many homeowners build just under that threshold." },
      { type: "cta", text: "Get your exact ADU cost estimate", href: "/" },
      { type: "p", text: "The fastest way to a realistic number is to run your own state, size and type through the free calculator. It returns a low–high range built from 2024–2025 ADU cost data and your state's regional index." },
    ],
  },
  {
    slug: "garage-to-adu-conversion-cost",
    title: "Garage to ADU Conversion Cost: What You'll Actually Pay",
    description:
      "Converting a garage is the cheapest way to add an ADU. Here's what a garage-to-ADU conversion really costs in 2026, what drives the price up, and when it beats a detached build.",
    keyword: "garage to adu conversion cost",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Converting an attached or detached garage into a living unit is the lowest-cost path to an ADU, typically $120–$220 per square foot versus $220–$360 for a detached new build. For a 400 sq ft conversion that's roughly $48,000–$88,000 before regional adjustments — and often less than half the cost of building from scratch." },
      { type: "h2", text: "Why conversions are cheaper" },
      { type: "p", text: "You're reusing the three most expensive parts of any structure: the foundation, the framed walls and the roof. The budget goes into making the space habitable rather than building a shell." },
      { type: "ul", items: [
        "Insulation and drywall for walls and ceiling",
        "A kitchenette or full kitchen and a bathroom (the costliest rooms)",
        "Electrical upgrades and a dedicated panel or subpanel",
        "Plumbing runs to the main line",
        "Egress windows, a proper entry door and HVAC (often a mini-split)",
        "Replacing the garage door with a framed, insulated wall",
      ]},
      { type: "h2", text: "What pushes the price up" },
      { type: "p", text: "Three things turn a cheap conversion into an expensive one: a slab that needs to be raised or re-poured for plumbing and moisture, electrical service that has to be upsized, and bringing an old structure up to current energy code. If your garage already has a sound slab and nearby utilities, you're on the low end of the range." },
      { type: "h2", text: "A bonus in California" },
      { type: "p", text: "Under California's statewide ADU law, a garage conversion requires no additional setback, and cities cannot require you to replace the parking you're removing. That removes two of the biggest obstacles homeowners hit elsewhere." },
      { type: "cta", text: "Estimate your garage conversion cost", href: "/cost/garage-conversion" },
    ],
  },
  {
    slug: "california-adu-rules-2026",
    title: "California ADU Rules in 2026: Size, Setbacks & Parking",
    description:
      "A plain-English guide to California's statewide ADU law in 2026 — the 800 sq ft guarantee, 4 ft setbacks, the transit parking exemption and the 60-day approval rule.",
    keyword: "california adu rules",
    date: "2026-06-14",
    readingMinutes: 8,
    blocks: [
      { type: "p", text: "California has the most homeowner-friendly ADU law in the country, codified at Government Code §66314 and following. It preempts local bans, so even if your city's old zoning code says no, the state rules generally win. Here's what actually applies in 2026." },
      { type: "h2", text: "Size: the 800 sq ft guarantee" },
      { type: "p", text: "Your city must allow a detached ADU of at least 800 sq ft regardless of lot coverage, floor-area-ratio or other local limits. Most cities allow up to 1,200 sq ft. A junior ADU (JADU) is capped at 500 sq ft and must be inside the existing home." },
      { type: "h2", text: "Setbacks: 4 feet" },
      { type: "p", text: "The maximum side and rear setback a city can require is 4 feet. Converting an existing structure (like a garage) requires no additional setback at all, even if it sits on the property line." },
      { type: "h2", text: "Parking: often none" },
      { type: "p", text: "No replacement or additional parking can be required if the ADU is within half a mile walking distance of public transit, in a historic district, or part of the existing or proposed primary residence. In practice, a large share of California lots qualify for zero added parking." },
      { type: "h2", text: "Owner-occupancy: no longer required" },
      { type: "p", text: "Thanks to AB 976, the owner-occupancy requirement is permanently barred for ADUs. You can rent out both the main house and the ADU without living on the property — a major change for investors." },
      { type: "h2", text: "Approval: 60 days, ministerial" },
      { type: "p", text: "A complete ADU application must be approved or denied within 60 days, ministerially — meaning no public hearing and no discretionary design review. ADUs under 750 sq ft are also exempt from impact fees." },
      { type: "cta", text: "Check your California city's ADU rules", href: "/california" },
    ],
  },
  {
    slug: "adu-vs-jadu",
    title: "ADU vs JADU: Which Backyard Unit Should You Build?",
    description:
      "ADU vs JADU explained — the size limits, cost difference, owner-occupancy rules and rental potential of a junior ADU versus a full accessory dwelling unit.",
    keyword: "adu vs jadu",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "A JADU (junior accessory dwelling unit) and an ADU sound similar but are legally different products. Choosing the right one can save you tens of thousands of dollars — or unlock far more rent." },
      { type: "h2", text: "What a JADU is" },
      { type: "p", text: "A JADU is up to 500 sq ft, must be created within the walls of an existing single-family home (often a converted bedroom), and can share a bathroom with the main house. It needs only an efficiency kitchen. Because you're not adding new structure, it's the cheapest unit you can build — frequently $40,000–$90,000." },
      { type: "h2", text: "What a full ADU is" },
      { type: "p", text: "A full ADU can be detached, attached or a garage conversion, up to 1,200 sq ft in many jurisdictions, with its own full kitchen and bathroom. It costs more but rents for more and adds more resale value." },
      { type: "h2", text: "The owner-occupancy catch" },
      { type: "p", text: "In most states you can rent out a full ADU without living on-site. A JADU almost always still requires the owner to occupy either the main home or the JADU — so if your goal is a pure rental or you don't live there, a full ADU is usually the better fit." },
      { type: "ul", items: [
        "Tightest budget, you live on-site: build a JADU.",
        "Want maximum rent or a pure rental: build a full ADU.",
        "Have an underused garage: a garage conversion splits the difference.",
      ]},
      { type: "cta", text: "Compare costs for each ADU type", href: "/" },
    ],
  },
  {
    slug: "how-to-finance-an-adu",
    title: "How to Finance an ADU: 6 Ways to Pay for a Backyard Home",
    description:
      "Six ways to finance an ADU in 2026 — HELOC, cash-out refinance, renovation loans, construction loans, ADU-specific loans and contractor financing — with the pros and cons of each.",
    keyword: "how to finance an adu",
    date: "2026-06-14",
    readingMinutes: 7,
    blocks: [
      { type: "p", text: "An ADU typically costs more than most homeowners have in cash, so financing is part of nearly every project. The right option depends on how much equity you have and whether you want one loan or two." },
      { type: "h2", text: "1. Home equity line of credit (HELOC)" },
      { type: "p", text: "The most common choice. You borrow against your home's equity as you need it, paying interest only on what you draw. Flexible and relatively cheap, but the rate is usually variable." },
      { type: "h2", text: "2. Cash-out refinance" },
      { type: "p", text: "Replace your mortgage with a larger one and take the difference as cash. Makes sense if current rates are at or below your existing rate; less attractive if refinancing would raise your rate." },
      { type: "h2", text: "3. Renovation loan (FHA 203k / Fannie Mae HomeStyle)" },
      { type: "p", text: "These let you borrow against the home's projected value after the ADU is built, which helps if you don't yet have enough equity." },
      { type: "h2", text: "4. Construction loan" },
      { type: "p", text: "A short-term loan that funds the build in stages, then converts to or is replaced by a permanent mortgage. More paperwork, but designed for ground-up projects." },
      { type: "h2", text: "5. ADU-specific loans" },
      { type: "p", text: "A growing number of lenders and credit unions offer products that underwrite the future rental income of the ADU, letting you borrow more than your current equity alone would allow." },
      { type: "h2", text: "6. Builder or prefab financing" },
      { type: "p", text: "Many prefab ADU companies partner with lenders to bundle the unit and the loan. Convenient, but compare the rate against a HELOC before committing." },
      { type: "cta", text: "First, find out what your ADU will cost", href: "/" },
    ],
  },
  {
    slug: "prefab-adu-cost",
    title: "Prefab ADU Cost: Is a Modular Backyard Home Actually Cheaper?",
    description:
      "What a prefab or modular ADU costs in 2026, how it compares to a site-built unit, and the site-work and delivery costs people forget to budget for.",
    keyword: "prefab adu cost",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Prefab and modular ADUs promise a faster, more predictable build, and they often deliver — but 'the unit price' you see advertised is rarely the all-in cost. Expect $180–$300 per square foot turnkey once site work is included." },
      { type: "h2", text: "The price you see vs the price you pay" },
      { type: "p", text: "A prefab company might quote $120,000 for a 500 sq ft unit. That's the box. On top of it you'll pay for the foundation, delivery and craning the module into place, utility trenching and hookups, permits, and any grading. Those line items commonly add 30–50% to the advertised price." },
      { type: "h2", text: "Where prefab wins" },
      { type: "ul", items: [
        "Speed: factory and site work happen in parallel, so timelines are often half that of site-built.",
        "Price certainty: most of the cost is fixed before installation.",
        "Quality control: factory conditions reduce weather delays and rework.",
      ]},
      { type: "h2", text: "Where site-built wins" },
      { type: "p", text: "If your lot is hard to access (a crane can't reach the backyard), or you want a fully custom layout, site-built can end up cheaper and simpler. Tight urban lots are the classic case where prefab's delivery advantage disappears." },
      { type: "cta", text: "Estimate your prefab ADU cost by state", href: "/cost/prefab" },
    ],
  },
  {
    slug: "adu-permit-process",
    title: "The ADU Permit Process: A Step-by-Step Guide for 2026",
    description:
      "How the ADU permit process actually works in 2026 — from feasibility and design through plan check, approval and inspections — and how long each stage takes.",
    keyword: "adu permit process",
    date: "2026-06-14",
    readingMinutes: 7,
    blocks: [
      { type: "p", text: "The permit is where most ADU projects stall — not because the unit is unbuildable, but because owners don't know the sequence. Here's the path nearly every ADU follows, and where the time goes." },
      { type: "h2", text: "1. Feasibility (1–2 weeks)" },
      { type: "p", text: "Confirm your lot allows an ADU and what size and setbacks apply. In states with a statewide law this is usually a yes; elsewhere you check the local zoning code. This is the stage ADUYes is built for." },
      { type: "h2", text: "2. Design and construction documents (4–10 weeks)" },
      { type: "p", text: "An architect or designer produces the drawings the city needs: site plan, floor plan, elevations, structural and Title 24/energy calcs. Prefab units shortcut much of this with pre-approved plans." },
      { type: "h2", text: "3. Plan check submission and review (4–12 weeks)" },
      { type: "p", text: "You submit to the building department. They review for code compliance and usually return comments ('corrections') you address before resubmitting. In California, ADU applications must be approved ministerially within 60 days of a complete submission — no public hearing." },
      { type: "h2", text: "4. Permit issuance and fees" },
      { type: "p", text: "Once approved, you pay permit and (if applicable) impact fees and pull the permit. California waives impact fees for ADUs under 750 sq ft." },
      { type: "h2", text: "5. Construction and inspections" },
      { type: "p", text: "The city inspects at key milestones — foundation, framing, rough electrical/plumbing, insulation and final. Passing the final inspection gives you a certificate of occupancy." },
      { type: "cta", text: "Start with a feasibility check", href: "/" },
    ],
  },
  {
    slug: "adu-rental-income-and-roi",
    title: "ADU Rental Income & ROI: Do Backyard Units Actually Pay Off?",
    description:
      "How much rental income an ADU generates, how to estimate payback period and ROI, and the factors that make a backyard unit a strong or weak investment.",
    keyword: "adu rental income",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "For many homeowners the ADU math is simple: does the rent cover the loan? Often it does — but the answer depends on your build cost, local rents and how you finance it." },
      { type: "h2", text: "Estimating rental income" },
      { type: "p", text: "A detached ADU typically rents for 60–80% of a comparable standalone home in the same area because it's smaller and shares a lot. Check local listings for studios and one-bedrooms, then discount slightly. A unit renting at $1,800/month produces $21,600 a year before expenses." },
      { type: "h2", text: "The payback math" },
      { type: "p", text: "Divide your all-in build cost by annual net rent for a rough payback period. A $180,000 ADU netting $18,000/year pays back in about 10 years — and then becomes pure cash flow, on top of the resale value it added to your property." },
      { type: "h2", text: "What makes ROI strong" },
      { type: "ul", items: [
        "A cheaper build path (garage conversion or prefab) lowers the denominator.",
        "High local rents (coastal metros) raise the numerator.",
        "No owner-occupancy requirement, so you can rent both units.",
        "Financing at a rate below your expected rental yield.",
        "Short-term or mid-term rental in a tourist or travel-nurse market.",
      ]},
      { type: "h2", text: "What weakens it" },
      { type: "p", text: "Expensive custom detached builds in low-rent areas, high financing rates, and strict owner-occupancy or short-term-rental bans. Run your specific numbers before committing." },
      { type: "cta", text: "Estimate your ADU build cost first", href: "/" },
    ],
  },
  {
    slug: "how-long-to-build-an-adu",
    title: "How Long Does It Take to Build an ADU?",
    description:
      "A realistic ADU timeline for 2026 — from feasibility and design through permitting and construction — and how prefab and garage conversions can cut months off the schedule.",
    keyword: "how long does it take to build an adu",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Most ADUs take 8 to 14 months from first sketch to move-in. The build itself is rarely the bottleneck — design and permitting usually take as long as construction." },
      { type: "h2", text: "Typical timeline by stage" },
      { type: "ul", items: [
        "Feasibility: 1–2 weeks",
        "Design and construction documents: 1–3 months",
        "Permitting and plan check: 1–3 months (faster where state law mandates a 60-day ministerial review)",
        "Construction: 4–8 months for site-built; 2–4 months for prefab/modular",
      ]},
      { type: "h2", text: "The fastest paths" },
      { type: "p", text: "A garage conversion skips foundation and shell work, often finishing construction in 2–4 months. A prefab unit overlaps factory build with on-site foundation work, compressing the back half of the schedule. The slowest path is a fully custom detached build in a city with a slow permit office." },
      { type: "h2", text: "How to avoid delays" },
      { type: "p", text: "Submit a complete application the first time, use pre-approved or prefab plans where possible, and confirm feasibility before you pay for design. The most common delay is plan-check corrections caused by missing documents." },
      { type: "cta", text: "Check feasibility before you start", href: "/" },
    ],
  },
  {
    slug: "washington-adu-law-hb-1337",
    title: "Washington ADU Law (HB 1337): What Homeowners Need to Know",
    description:
      "Washington's HB 1337 (2023) requires cities to allow two ADUs per lot. Here's what the law guarantees on size, parking and owner-occupancy — and what it means for your build.",
    keyword: "washington adu law",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "Washington's HB 1337, passed in 2023 and codified at RCW 36.70A.681, is one of the most aggressive ADU laws in the country. If you live in an urban growth area, it dramatically expands what you can build." },
      { type: "h2", text: "Two ADUs per lot" },
      { type: "p", text: "Cities and counties planning under the Growth Management Act must allow at least two ADUs on most single-family lots — for example one detached unit plus one interior or attached unit." },
      { type: "h2", text: "Size: at least 1,000 sq ft" },
      { type: "p", text: "The law requires cities to allow ADUs of at least 1,000 sq ft, larger than many older local codes permitted." },
      { type: "h2", text: "No owner-occupancy, limited parking" },
      { type: "p", text: "Cities cannot require the owner to live on-site, and cannot require off-street parking for an ADU within half a mile of a major transit stop. Both rules remove obstacles that historically killed Washington ADU projects." },
      { type: "h2", text: "What it means for you" },
      { type: "p", text: "In Seattle, Tacoma, Spokane, Vancouver and other Washington cities, an ADU is now a by-right project on most single-family lots. Confirm your specific lot and any design standards with your city, then estimate your cost." },
      { type: "cta", text: "See Washington ADU costs", href: "/washington" },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Up to `n` other posts to surface as "related reading" (internal linking). */
export function relatedPosts(slug: string, n = 3): Post[] {
  const idx = POSTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return POSTS.slice(0, n);
  const rest: Post[] = [];
  for (let i = 1; i <= POSTS.length && rest.length < n; i++) {
    rest.push(POSTS[(idx + i) % POSTS.length]);
  }
  return rest;
}

// ──────────────────────────────────────────────────────────────────────────────
// Stage-4 weekly content — published 2026-06-14
// ──────────────────────────────────────────────────────────────────────────────

const WEEK2_POSTS: Post[] = [
  {
    slug: "washington-state-adu-rules",
    title: "Washington State ADU Rules: What Homeowners Can Build in 2026",
    description: "Washington's 2023 ADU law (HB 1337) requires cities statewide to allow ADUs on single-family lots. Here's what the law mandates and what you can actually build.",
    keyword: "washington state adu rules",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Washington state passed some of the most permissive ADU legislation in the country in 2023 (HB 1337). The law requires all cities in Washington to allow at least one ADU on any lot that permits a detached single-family home — and in most cases, two." },
      { type: "h2", text: "What the statewide law requires" },
      { type: "ul", items: [
        "Cities must allow at least one ADU (attached or detached) on every single-family lot.",
        "Maximum size: at least 1,000 sq ft for detached ADUs; cities may allow more.",
        "Setbacks: no local setback requirement can exceed 5 feet from the rear or side property line.",
        "Height: detached ADUs may be up to 24 feet or the height of the primary dwelling, whichever is greater.",
        "Cities may NOT require owner-occupancy of either the primary home or the ADU.",
        "Cities may NOT require additional off-street parking for an ADU.",
      ] },
      { type: "h2", text: "What cities can still restrict" },
      { type: "p", text: "Local governments retain authority over design standards, lot coverage limits, and utility connections. They can require ADUs to match the exterior character of the primary dwelling, and they can limit ADU size to no larger than the main house." },
      { type: "h2", text: "Key cities: Seattle, Spokane, Tacoma" },
      { type: "p", text: "Seattle already allowed ADUs before the state law and permits both a detached ADU and a DADU on a single lot. Spokane and Tacoma have updated their codes to comply with the state mandate. Check your specific city's zoning portal for local maximums beyond the state floor." },
      { type: "cta", text: "Check your Washington lot's ADU feasibility", href: "/washington" },
      { type: "p", text: "This article is informational only. Local ordinances and lot-specific conditions affect feasibility — always confirm with your city planning department." },
    ],
  },
  {
    slug: "oregon-adu-laws",
    title: "Oregon ADU Laws: Statewide Rules That Override Local Restrictions",
    description: "Oregon's SB 1051 (2017) and HB 2001 (2019) make it one of the most ADU-friendly states. Here's what you can build, how large it can be, and what cities can no longer restrict.",
    keyword: "oregon adu laws",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Oregon's approach to ADUs is among the most progressive in the country. A series of state laws — beginning with SB 1051 (2017) and expanded by HB 2001 (2019) and SB 458 (2021) — opened up ADU development statewide by overriding restrictive local zoning rules." },
      { type: "h2", text: "What SB 1051 (2017) started" },
      { type: "p", text: "SB 1051 was Oregon's foundational ADU law: it required cities with populations over 2,500 to allow at least one accessory dwelling unit on each lot zoned for single-family homes (codified at ORS 197.312). HB 2001 (2019) then went further, requiring larger cities to allow duplexes and other middle housing in single-family zones." },
      { type: "h2", text: "What SB 458 (2021) added" },
      { type: "ul", items: [
        "Made it easier to split lots in urban areas to legally separate ADUs from the main house.",
        "Required that ADUs meeting state minimum standards be approved ministerially — no discretionary review.",
        "Reduced the ability of local governments to impose design requirements that increase cost without serving a legitimate planning goal.",
      ] },
      { type: "h2", text: "Size and setback standards" },
      { type: "p", text: "In Oregon cities subject to the state mandate, a detached ADU may be up to 900 sq ft on lots smaller than 2,500 sq ft, and up to 1,200 sq ft on larger lots. Setback requirements cannot exceed 4 feet from the rear or interior side yard. Maximum height of 25 feet is typical but varies by locality." },
      { type: "cta", text: "Check your Oregon ADU feasibility and cost estimate", href: "/oregon" },
      { type: "p", text: "Rules vary by city size and whether the city has adopted its own compliant code. Always verify with your local planning department." },
    ],
  },
  {
    slug: "texas-adu-regulations",
    title: "ADU Regulations in Texas: A City-by-City Breakdown",
    description: "Texas has no statewide ADU legislation, so the rules depend entirely on your city. Here is the ADU landscape in Austin, Houston, Dallas, San Antonio and other Texas markets.",
    keyword: "texas adu regulations",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Unlike California, Washington and Oregon, Texas has not passed statewide ADU preemption legislation. That means ADU feasibility in Texas is entirely a local question — your city's zoning code determines whether you can build one, how big it can be, and what it needs to look like." },
      { type: "h2", text: "Austin: the most ADU-friendly Texas market" },
      { type: "p", text: "Austin allows ADUs on most single-family lots under its HOME ordinance changes of 2023. A detached ADU ('secondary apartment') can be up to 1,100 sq ft, and owner-occupancy is no longer required. Austin also allows vertical mixed-use near transit." },
      { type: "h2", text: "Houston: no zoning, but deed restrictions apply" },
      { type: "p", text: "Houston is famously the only major US city without traditional zoning. In theory, you can build an ADU almost anywhere. In practice, deed restrictions in most established neighborhoods often restrict additional structures. Check the deed and any HOA rules before planning." },
      { type: "h2", text: "Dallas, San Antonio, Fort Worth" },
      { type: "ul", items: [
        "Dallas allows ADUs only in specific zoning categories; many single-family zones prohibit them outright.",
        "San Antonio permits ADUs in some residential zones but requires owner-occupancy of the main house.",
        "Fort Worth has been expanding ADU permissions, particularly for garage conversions, under recent code revisions.",
      ] },
      { type: "cta", text: "Check ADU feasibility for your Texas address", href: "/texas" },
      { type: "p", text: "Texas ADU rules are evolving rapidly. Confirm with your specific city's development services department before planning or investing." },
    ],
  },
  {
    slug: "adu-setback-requirements",
    title: "ADU Setback Requirements: How Close to the Property Line?",
    description: "ADU setbacks determine how close to the property line your unit can sit. California mandates a maximum 4-foot setback for most ADUs. Here is how other states and cities compare.",
    keyword: "adu setback requirements",
    date: "2026-06-14",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "Setbacks are the minimum distance your ADU must be from the property line. They directly affect whether a given lot has room for an ADU at all — especially on smaller infill lots." },
      { type: "h2", text: "California: 4-foot maximum setback" },
      { type: "p", text: "California Government Code 65852.2 caps rear and side setbacks at 4 feet for ADUs that meet state law standards. No city can require more than a 4-foot setback from the rear or side, though a larger street-facing setback may still apply. This is one of the most important ADU preemptions in the country." },
      { type: "h2", text: "Other states and typical setback rules" },
      { type: "ul", items: [
        "Washington: no more than 5 feet from rear or side (HB 1337).",
        "Oregon: no more than 4 feet for lots subject to the state mandate.",
        "Texas, Florida, other states: no statewide preemption — setbacks are whatever the local code says, often 5–10 feet.",
      ] },
      { type: "h2", text: "How setbacks affect lot coverage" },
      { type: "p", text: "Even if your jurisdiction allows a 4-foot setback, lot coverage limits (the maximum percentage of a lot that can be covered by structures) may independently constrain the ADU footprint. Check both the setback rule and the lot-coverage limit for your parcel." },
      { type: "cta", text: "Run your lot through the ADU feasibility calculator", href: "/" },
      { type: "p", text: "Setback rules vary by parcel, zoning district and whether your lot is in a fire hazard severity zone. Always verify with your local planning department." },
    ],
  },
  {
    slug: "adu-size-limits-by-state",
    title: "ADU Size Limits by State: Maximum Square Footage Rules Explained",
    description: "State ADU laws set a floor for maximum allowed ADU size. California allows up to 1,200 sq ft; Oregon up to 900 sq ft on smaller lots. Here are the rules by state.",
    keyword: "adu size limits by state",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "How large an ADU can be depends on a two-layer rule system: the state sets a minimum floor (states must allow at least this large), and the local government can allow up to that floor or more — but cannot go below it. Here is where the major ADU states stand." },
      { type: "h2", text: "California: up to 1,200 sq ft" },
      { type: "p", text: "California Government Code 65852.2 requires local governments to allow detached ADUs of at least 800 sq ft regardless of lot size or floor area ratio limits. Most jurisdictions allow up to 1,200 sq ft for detached ADUs and 500 sq ft for JADUs. Some jurisdictions allow larger ADUs by local ordinance." },
      { type: "h2", text: "Washington: up to 1,000 sq ft minimum floor" },
      { type: "p", text: "HB 1337 (2023) requires Washington cities to allow ADUs of at least 1,000 sq ft or 50% of the primary dwelling's size, whichever is smaller. Cities may allow larger ADUs by local ordinance." },
      { type: "h2", text: "Oregon: 900 sq ft on smaller lots, 1,200 on larger" },
      { type: "ul", items: [
        "Lots under 2,500 sq ft: ADU may be up to 900 sq ft.",
        "Lots 2,500–5,000 sq ft: ADU may be up to 1,200 sq ft.",
        "Lots over 5,000 sq ft: ADU may be up to 1,200 sq ft or 50% of primary dwelling, whichever is less.",
      ] },
      { type: "h2", text: "States without statewide preemption" },
      { type: "p", text: "In states like Texas, Georgia and most of the Southeast, ADU size limits are entirely set by local zoning codes — no statewide floor exists. Size limits often range from 400 to 1,000 sq ft with wide variation by city and zoning district." },
      { type: "cta", text: "Get the size rules for your state and city instantly", href: "/" },
      { type: "p", text: "ADU laws are evolving rapidly. Always confirm current maximum sizes with your local planning department." },
    ],
  },
  {
    slug: "container-home-adu",
    title: "Container Home ADU: Is a Shipping Container ADU Cheaper or Legal?",
    description: "Shipping container ADUs look striking — but are they actually cheaper to build, and are they legal in your jurisdiction? An honest look at the trade-offs.",
    keyword: "container home adu",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "The idea of converting a 40-foot shipping container into a backyard ADU is appealing: industrial aesthetic, potentially lower cost, faster construction. The reality involves a few important trade-offs." },
      { type: "h2", text: "Are container ADUs actually cheaper?" },
      { type: "p", text: "A standard 40-foot high-cube shipping container (320 sq ft on one level) costs $3,000–$6,000 to acquire. However, the cost of converting it into habitable space — insulation, interior framing, plumbing, electrical, HVAC, doors, windows, and permits — brings the total to roughly $150–$250 per square foot. That is in line with a conventional detached ADU. The container itself is a small fraction of the overall budget." },
      { type: "h2", text: "The bigger challenge: permits and code compliance" },
      { type: "ul", items: [
        "Most jurisdictions require ADUs to be built to the International Residential Code (IRC). Container structures are not inherently IRC-compliant.",
        "Insulating a metal container requires either spray foam (air-sealing) or an interior framing system — both adding cost.",
        "Structural modifications for additional openings can compromise the container's integral strength.",
        "Some counties specifically exclude container structures from their ADU approval pathways.",
      ] },
      { type: "h2", text: "Where container ADUs work best" },
      { type: "p", text: "Container ADUs are most viable in rural areas with permissive building codes, or in jurisdictions that have adopted a specific container-building pathway. Urban areas with standard residential zoning tend to have more hurdles. Always check with your local building department before buying a container." },
      { type: "cta", text: "Check ADU feasibility for your address before committing", href: "/" },
      { type: "p", text: "Container ADU legality and cost vary significantly by jurisdiction and site conditions. Consult a licensed contractor and your local building department." },
    ],
  },
  {
    slug: "adu-building-codes",
    title: "ADU Building Codes: Key Requirements for Safety and Permitting",
    description: "ADUs must meet the same building codes as primary homes — electrical, plumbing, structural, fire and energy. Here are the key requirements to plan around.",
    keyword: "adu building codes",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "An ADU is a permanent dwelling, and it must meet the same building codes as any other residence. Understanding the key code requirements upfront helps you design a feasible project and budget realistically for compliance costs." },
      { type: "h2", text: "Structural and foundation requirements" },
      { type: "p", text: "A new detached ADU needs a proper foundation — typically a concrete slab-on-grade or a raised perimeter foundation. For garage conversions, the existing slab usually meets structural requirements, but a soils report may be required in seismic zones (California, Pacific Northwest) to confirm the existing slab is adequate." },
      { type: "h2", text: "Electrical, plumbing and HVAC" },
      { type: "ul", items: [
        "Electrical: separate meter panel; at minimum, a sub-panel from the main house panel. Service size depends on ADU size and appliances.",
        "Plumbing: separate water shut-off and individual drain connection to the city sewer (or septic). Most jurisdictions do not require a separate sewer lateral, but this varies.",
        "HVAC: a dedicated heating and cooling system — a shared system with the primary dwelling is typically not allowed for an independent ADU.",
      ] },
      { type: "h2", text: "Fire safety and egress" },
      { type: "p", text: "ADUs require smoke and carbon monoxide detectors in every bedroom and in the hallway adjacent to sleeping areas. Every bedroom must have an egress window meeting minimum opening dimensions. Sprinkler systems are typically not required in ADUs in most states — California specifically exempted ADUs from the sprinkler mandate in 2020." },
      { type: "h2", text: "Energy code compliance" },
      { type: "p", text: "California's Title 24 energy code applies to ADUs and requires specific insulation R-values, window U-factors, and in new construction, solar-ready wiring (and often solar panels). Other states follow IECC energy codes. Energy compliance documentation must be submitted with permit plans." },
      { type: "cta", text: "Check your ADU feasibility and get a cost estimate that includes code compliance", href: "/" },
      { type: "p", text: "Building codes vary by state and local jurisdiction. Always confirm current requirements with your local building department and a licensed contractor." },
    ],
  },
  {
    slug: "florida-adu-rules",
    title: "ADU Rules in Florida: What Homeowners Need to Know in 2026",
    description: "Florida has no statewide ADU mandate — rules are set by your city or county. Here's how Florida ADU zoning works and what to check before you build.",
    keyword: "florida adu rules",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Unlike California or Washington, Florida has no statewide law requiring cities to allow accessory dwelling units. ADUs in Florida are governed entirely by local zoning, so whether you can build one — and how big — depends on your specific city or county." },
      { type: "h2", text: "Where Florida ADUs are allowed" },
      { type: "p", text: "Several Florida jurisdictions have adopted their own ADU ordinances, often to expand housing supply. Cities including Miami, Orlando, Tampa and St. Petersburg permit ADUs in some single-family zones, typically with size caps, setback rules and sometimes owner-occupancy requirements. Many other Florida cities still restrict or prohibit them." },
      { type: "h2", text: "What to confirm with your local planning department" },
      { type: "ul", items: [
        "Whether ADUs (detached, attached or garage conversion) are permitted in your zoning district at all.",
        "Maximum ADU size — local caps commonly run 600–1,000 sq ft.",
        "Setback, height and lot-size minimums, plus any owner-occupancy or short-term-rental restrictions.",
        "Parking requirements, which vary widely between Florida cities.",
      ] },
      { type: "h2", text: "Why it's worth checking first" },
      { type: "p", text: "Because Florida leaves ADU rules to local government, two neighboring cities can have completely different rules. Always confirm the current ordinance with your city or county before investing in design — then use the calculator below to estimate cost." },
      { type: "cta", text: "Check your Florida ADU feasibility instantly", href: "/florida" },
      { type: "p", text: "Florida ADU rules vary by jurisdiction and change over time. Confirm current requirements with your city or county planning department." },
    ],
  },
  {
    slug: "adu-parking-requirements",
    title: "ADU Parking Requirements: Are You Required to Add a Parking Space?",
    description: "California dropped ADU parking requirements near transit, and many states followed. Here's how ADU parking rules work and how they affect your project's feasibility.",
    keyword: "adu parking requirements",
    date: "2026-06-14",
    readingMinutes: 4,
    blocks: [
      { type: "p", text: "One of the most common barriers to ADU feasibility used to be the requirement to add an off-street parking space for each new unit. State ADU laws have systematically dismantled these requirements in many markets — here is where things stand." },
      { type: "h2", text: "California: no parking required in most cases" },
      { type: "p", text: "California's ADU law eliminates parking requirements for ADUs in any of these situations: within half a mile of public transit, within an architecturally or historically significant district, part of a garage conversion, within one block of a car-share vehicle, or in a city that has no minimum parking for residential uses. In practice, most urban California ADUs have no parking requirement." },
      { type: "h2", text: "Washington: no local parking requirements allowed" },
      { type: "p", text: "HB 1337 (2023) prohibits Washington cities from requiring any additional off-street parking for an ADU, full stop. This is the most complete parking exemption of any state ADU law." },
      { type: "h2", text: "Other states: parking rules vary" },
      { type: "ul", items: [
        "Oregon: cities may not require more than one additional parking space per ADU, and none if within half a mile of transit.",
        "Texas, Florida and most other states: no statewide parking preemption — local rules apply, often requiring one space per ADU or per bedroom.",
      ] },
      { type: "h2", text: "Why parking requirements matter for feasibility" },
      { type: "p", text: "A parking requirement on a tight lot can make an ADU impossible — there simply may not be room to add a paved space and still fit the ADU structure within setbacks and lot coverage limits. Knowing your jurisdiction's parking rule is one of the first feasibility checks to make." },
      { type: "cta", text: "Check whether your lot needs ADU parking", href: "/" },
      { type: "p", text: "Parking rules change frequently. Always confirm with your local planning department." },
    ],
  },
  {
    slug: "adu-impact-fees",
    title: "ADU Impact Fees: What They Are and How to Reduce Them",
    description: "Impact fees are one-time charges on new construction. California exempts most ADUs under 750 sq ft. Here's how impact fees work for ADUs and how to reduce them.",
    keyword: "adu impact fees",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Impact fees are one-time charges imposed at the time of building permit issuance to fund schools, parks, roads and water/sewer infrastructure that new development demands. They can add $5,000–$50,000+ to an ADU project depending on the jurisdiction." },
      { type: "h2", text: "California's impact fee exemption" },
      { type: "p", text: "California law (Government Code 65852.2(f)(3)) requires that cities and counties NOT impose impact fees on ADUs that are less than 750 square feet. ADUs over 750 sq ft may have impact fees, but they must be proportional to the ADU's size relative to the primary dwelling — not treated as a full new unit. This saves thousands of dollars on smaller ADUs." },
      { type: "h2", text: "Utility connection fees are separate" },
      { type: "p", text: "The impact fee exemption in California does NOT apply to utility connection fees — water, sewer and electrical connection fees may still apply. These can range from $2,000 to $20,000+ depending on whether a new service connection must be run from the street. If you are converting a garage with an existing utility connection, these fees are often minimal." },
      { type: "h2", text: "Other states: no universal exemption" },
      { type: "ul", items: [
        "Washington: no statewide impact fee exemption for ADUs; some cities have adopted local exemptions.",
        "Oregon: impact fees apply at local rates; some cities have reduced fees for ADUs to encourage construction.",
        "Florida, Texas and other states: impact fees for ADUs are set entirely by local government.",
      ] },
      { type: "cta", text: "Estimate your ADU cost including typical fees", href: "/" },
      { type: "p", text: "Impact fee amounts and exemptions change frequently. Confirm current fee schedules with your local building or planning department." },
    ],
  },
  {
    slug: "adu-for-aging-parents",
    title: "Building an ADU for Aging Parents: The Complete Planning Guide",
    description: "An ADU lets aging parents live nearby while maintaining independence. This guide covers planning for accessibility, permitting, cost and financing a family ADU project.",
    keyword: "adu for aging parents",
    date: "2026-06-14",
    readingMinutes: 6,
    blocks: [
      { type: "p", text: "One of the most personal and financially meaningful reasons to build an ADU is to provide nearby, independent housing for aging parents. A well-planned in-law suite or detached backyard cottage can dramatically improve quality of life for the whole family." },
      { type: "h2", text: "Accessibility design features to build in from the start" },
      { type: "ul", items: [
        "Single-story layout — no stairs to climb.",
        "No-threshold shower with fold-down bench and grab bars.",
        "Wider doorways (36 inches) to accommodate a walker or wheelchair.",
        "Lever-style door handles and single-lever faucets.",
        "Lower countertop height in at least one work zone.",
        "Blocking in bathroom walls during construction for future grab bar installation.",
      ] },
      { type: "h2", text: "Permitting considerations for family ADUs" },
      { type: "p", text: "Most jurisdictions do not have a separate 'family ADU' permit category — an ADU for parents goes through the same standard permitting process as a rental unit. California's 'Junior ADU' (JADU) pathway, which allows a unit within the existing footprint of the house, may be faster and cheaper than a detached build if your home has a first-floor bedroom suite." },
      { type: "h2", text: "Financing options for family ADUs" },
      { type: "p", text: "Because the ADU will be occupied by a family member rather than a paying tenant, traditional investment property financing does not apply. Most homeowners use a home equity line of credit (HELOC) or a cash-out refinance to fund a family ADU build. Several states (California, Oregon, Washington) have ADU-specific loan programs through state housing agencies." },
      { type: "h2", text: "The financial case even without rental income" },
      { type: "p", text: "A family ADU avoids assisted living costs that can run $4,000–$8,000/month. Even at a $200,000 construction cost, the ADU pays for itself in 2–4 years compared to assisted living — and you retain the asset." },
      { type: "cta", text: "Estimate the cost to build an ADU for your parents", href: "/" },
      { type: "p", text: "ADU regulations and financing options vary by state and city. Always consult local planning and a financial advisor before committing to a project." },
    ],
  },
  {
    slug: "adu-zoning-laws",
    title: "ADU Zoning Laws: How Zoning Affects What You Can Build on Your Lot",
    description: "ADU zoning rules control where, how large and how dense ADUs can be on a given parcel. Understanding your zoning designation is the first step in any ADU project.",
    keyword: "adu zoning laws",
    date: "2026-06-14",
    readingMinutes: 5,
    blocks: [
      { type: "p", text: "Zoning is the foundational rule set for any ADU project. Before you hire a designer, spend $50,000 on a prefab unit, or even begin planning, you need to know what your zoning designation allows." },
      { type: "h2", text: "Single-family vs multi-family zoning" },
      { type: "p", text: "ADUs are primarily a single-family zone issue. Most state ADU laws apply specifically to lots zoned for single-family residential use (R-1, SR, or similar designations). Multi-family zoned lots typically allow ADUs more freely, but may have different rules under the zoning code." },
      { type: "h2", text: "How to find your zoning designation" },
      { type: "ul", items: [
        "Look up your county assessor's parcel data — zoning is usually listed.",
        "Use your city's online GIS zoning map — most major cities have one.",
        "Call or email your city's planning department if you cannot find it online.",
      ] },
      { type: "h2", text: "Overlay districts can add restrictions" },
      { type: "p", text: "Historic preservation overlay districts, flood zone overlays, hillside development overlays, and fire hazard severity zones can impose additional restrictions on top of the base zoning. A lot in a historic district may require design review for any ADU, and a lot in a high fire hazard severity zone (HFHSZ) in California must use fire-resistant materials and has additional setback requirements." },
      { type: "h2", text: "When state law overrides local zoning" },
      { type: "p", text: "In states like California, Washington and Oregon, statewide ADU laws override local zoning restrictions that are more restrictive than the state floor. If your city's zoning requires a 10-foot setback but state law caps setbacks at 4 feet, state law wins. In states without a statewide ADU law (such as Texas and Florida), local zoning fully governs. Understanding the interaction between state law and local zoning is key to knowing what you can actually build." },
      { type: "cta", text: "Check your ADU feasibility under state and local rules", href: "/" },
      { type: "p", text: "Zoning and state ADU laws change frequently. Always verify with your local planning department before finalizing any design or purchasing any materials." },
    ],
  },
];

// Merge the week-2 posts into the main export
POSTS.push(...WEEK2_POSTS);
