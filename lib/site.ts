// Single source of truth for site-wide metadata.
export const site = {
  name: "ADUYes",
  domain: "aduyes.com",
  url: "https://aduyes.com",
  tagline: "Can you build an ADU? Find out in 60 seconds — feasibility, rules & cost.",
  description:
    "ADUYes is a free accessory dwelling unit (ADU) feasibility and cost calculator. " +
    "Check your state and city's ADU rules — size limits, setbacks, parking and owner-occupancy — " +
    "and get an instant cost estimate for a detached ADU, garage conversion or JADU.",
  email: "hello@aduyes.com",
  // Disclaimer shown wherever cost / rule output appears.
  disclaimer:
    "Estimates are for planning only and are based on regional construction-cost indices and " +
    "published statewide ADU statutes. Local ordinances, lot conditions and contractor pricing " +
    "vary — always confirm with your city planning department and a licensed contractor.",
} as const;

export type Site = typeof site;
