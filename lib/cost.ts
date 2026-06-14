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
}

const SOFT_COST_SHARE = 0.18; // design, permits, fees, utility connections ≈ 18%

function round(n: number, to = 500): number {
  return Math.round(n / to) * to;
}

/** Compute a low/mid/high turnkey cost estimate for an ADU. */
export function estimateCost(input: CostInput): CostBreakdown {
  const typeInfo = getAduType(input.aduType);
  if (!typeInfo) throw new Error(`Unknown ADU type: ${input.aduType}`);
  const state = getState(input.stateSlug);
  const costIndex = state ? state.costIndex : 1.0;
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
  };
}

export function formatUSD(n: number): string {
  return "$" + n.toLocaleString("en-US");
}
