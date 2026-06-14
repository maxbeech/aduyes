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
      "A clear breakdown of what an accessory dwelling unit actually costs in 2026 — by construction type (detached, garage conversion, JADU, prefab) and by region — plus the hidden soft costs.",
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
    title: "California ADU Rules in 2026: Size, Setbacks, Parking and Owner-Occupancy",
    description:
      "A plain-English guide to California's statewide ADU law in 2026 — the 800 sq ft guarantee, 4 ft setbacks, the transit parking exemption, the 60-day approval rule and the end of owner-occupancy requirements.",
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
