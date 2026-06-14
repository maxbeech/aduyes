// Single source of truth for site-wide metadata.
export const site = {
  name: "ADUYes",
  domain: "aduyes.com",
  url: "https://aduyes.com",
  tagline: "Free ADU feasibility & cost calculator",
  // Kept ≤155 chars so it isn't truncated in search results (guarded by a test).
  description:
    "Free ADU feasibility & cost calculator. Check your state's accessory dwelling unit rules — size, setbacks, parking — and estimate your build cost in seconds.",
  email: "hello@aduyes.com",
  // Disclaimer shown wherever cost / rule output appears.
  disclaimer:
    "Estimates are for planning only and are based on regional construction-cost indices and " +
    "published statewide ADU statutes. Local ordinances, lot conditions and contractor pricing " +
    "vary — always confirm with your city planning department and a licensed contractor.",
} as const;

export type Site = typeof site;
