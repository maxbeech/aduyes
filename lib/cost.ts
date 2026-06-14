// ADU cost engine. Pure functions — no DB, no network. Fully unit-tested.
// Cost ranges are national $/sq ft baselines (turnkey, including soft costs) by
// ADU construction type, scaled by a state regional cost index. These are
// planning estimates derived from published 2024–2025 ADU cost surveys.

import { getState } from "./states";

export type AduType = "detached" | "attached" | "garage-conversion" | "jadu" | "prefab";

export interface AduTypeInfo {
  type: AduType;
  label: string;
  slug: string;
  // National $/sq ft turnkey range (before state cost index).
  lowPerSqft: number;
  highPerSqft: number;
  blurb: string;
}

export const ADU_TYPES: AduTypeInfo[] = [
  {
    type: "detached", label: "Detached new build", slug: "detached",
    lowPerSqft: 220, highPerSqft: 360,
    blurb: "A standalone backyard cottage built from the ground up. Most flexible and highest resale value, but the most expensive per square foot because everything — foundation, roof, utilities — is new.",
  },
  {
    type: "attached", label: "Attached addition", slug: "attached",
    lowPerSqft: 200, highPerSqft: 330,
    blurb: "An ADU that shares one or more walls with the main house. Slightly cheaper than detached because it reuses an existing wall and is closer to utilities.",
  },
  {
    type: "garage-conversion", label: "Garage conversion", slug: "garage-conversion",
    lowPerSqft: 120, highPerSqft: 220,
    blurb: "Converting an existing garage into a living unit. The cheapest path because the foundation, walls and roof already exist — you mostly add insulation, plumbing, a kitchen and a bathroom.",
  },
  {
    type: "jadu", label: "Junior ADU (JADU)", slug: "jadu",
    lowPerSqft: 100, highPerSqft: 180,
    blurb: "A junior ADU is carved out of the existing home (up to 500 sq ft), often a converted bedroom with an efficiency kitchen. Lowest cost and fastest, but smaller and usually requires owner-occupancy.",
  },
  {
    type: "prefab", label: "Prefab / modular", slug: "prefab",
    lowPerSqft: 180, highPerSqft: 300,
    blurb: "A factory-built unit delivered and installed on a prepared site. Faster and more price-predictable than site-built; the range includes delivery, crane and site work.",
  },
];

export function getAduType(slug: string): AduTypeInfo | undefined {
  return ADU_TYPES.find((t) => t.slug === slug || t.type === slug);
}

export interface CostInput {
  stateSlug: string;
  aduType: AduType;
  sqft: number;
  // Optional metro-level multiplier on top of the state index (city pages).
  cityMultiplier?: number;
}

// Curated metro construction-cost adjustments vs the state average (1.00 = state
// average). Major metros cost more than their state-wide baseline; this makes
// city pages numerically distinct and more accurate. Keyed by "stateSlug/citySlug".
// Directional planning estimates (documented in /methodology); unlisted cities use 1.00.
const CITY_COST_ADJ: Record<string, number> = {
  "california/san-francisco": 1.18, "california/san-jose": 1.15, "california/berkeley": 1.12,
  "california/oakland": 1.10, "california/los-angeles": 1.08, "california/santa-ana": 1.07,
  "california/irvine": 1.08, "california/san-diego": 1.05, "california/anaheim": 1.05,
  "california/sacramento": 0.98, "california/fresno": 0.92, "california/bakersfield": 0.9, "california/riverside": 0.95,
  "new-york/new-york-city": 1.2, "new-york/yonkers": 1.08, "new-york/buffalo": 0.9, "new-york/rochester": 0.9, "new-york/syracuse": 0.88,
  "washington/seattle": 1.12, "washington/bellevue": 1.14, "washington/spokane": 0.92,
  "massachusetts/boston": 1.14, "massachusetts/cambridge": 1.14, "massachusetts/somerville": 1.1,
  "illinois/chicago": 1.08, "illinois/evanston": 1.06,
  "colorado/denver": 1.05, "colorado/boulder": 1.12, "colorado/aspen": 1.3,
  "oregon/portland": 1.06, "oregon/bend": 1.05,
  "texas/austin": 1.06, "texas/dallas": 1.0, "texas/houston": 0.98,
  "florida/miami": 1.08, "florida/fort-lauderdale": 1.05, "florida/orlando": 0.98,
  "hawaii/honolulu": 1.05, "new-jersey/jersey-city": 1.12, "connecticut/stamford": 1.1,
  "nevada/las-vegas": 1.02, "arizona/scottsdale": 1.05, "tennessee/nashville": 1.03,
  "georgia/atlanta": 1.03, "north-carolina/asheville": 1.04, "utah/salt-lake-city": 1.02,
};

/** Metro cost multiplier vs the state average (1.00 if not specially listed). */
export function cityCostMultiplier(stateSlug: string, citySlugStr: string): number {
  return CITY_COST_ADJ[`${stateSlug}/${citySlugStr}`] ?? 1.0;
}

export interface CostComponents {
  hard: number; // construction (structure, finishes, MEP)
  soft: number; // design, permits, plan-check, impact fees
  site: number; // foundation, utility trenching, grading, connections
}

export interface CostBreakdown {
  low: number;
  mid: number;
  high: number;
  perSqftLow: number;
  perSqftHigh: number;
  costIndex: number;
  sqft: number;
  // Rough soft-cost slice already baked into the turnkey $/sq ft, surfaced for transparency.
  softCostShare: number;
  // Mid-cost split into hard / soft / site (sums to mid).
  components: CostComponents;
}

const SOFT_COST_SHARE = 0.18; // design, permits, fees, utility connections ≈ 18%

// Site-work share varies by type: a conversion/JADU reuses the existing shell, so
// little new foundation/site work; a detached new build needs the most.
const SITE_SHARE: Record<AduType, number> = {
  detached: 0.14, attached: 0.11, prefab: 0.12, "garage-conversion": 0.05, jadu: 0.03,
};

/** Split a mid turnkey cost into hard / soft / site components (sums to mid). */
export function costComponents(mid: number, aduType: AduType): CostComponents {
  const site = Math.round((mid * (SITE_SHARE[aduType] ?? 0.12)) / 100) * 100;
  const soft = Math.round((mid * SOFT_COST_SHARE) / 100) * 100;
  const hard = mid - site - soft;
  return { hard, soft, site };
}

function round(n: number, to = 500): number {
  return Math.round(n / to) * to;
}

/** Compute a low/mid/high turnkey cost estimate for an ADU. */
export function estimateCost(input: CostInput): CostBreakdown {
  const typeInfo = getAduType(input.aduType);
  if (!typeInfo) throw new Error(`Unknown ADU type: ${input.aduType}`);
  const state = getState(input.stateSlug);
  const baseIndex = state ? state.costIndex : 1.0;
  const cityMul = input.cityMultiplier && input.cityMultiplier > 0 ? input.cityMultiplier : 1.0;
  const costIndex = baseIndex * cityMul;
  const sqft = Math.max(100, Math.min(input.sqft, 1500));

  const perSqftLow = typeInfo.lowPerSqft * costIndex;
  const perSqftHigh = typeInfo.highPerSqft * costIndex;

  const low = round(perSqftLow * sqft);
  const high = round(perSqftHigh * sqft);
  const mid = round((low + high) / 2);

  return {
    low, mid, high,
    perSqftLow: Math.round(perSqftLow),
    perSqftHigh: Math.round(perSqftHigh),
    costIndex, sqft,
    softCostShare: SOFT_COST_SHARE,
    components: costComponents(mid, input.aduType),
  };
}

export function formatUSD(n: number): string {
  return "$" + n.toLocaleString("en-US");
}
