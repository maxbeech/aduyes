// ADU feasibility logic. Pure functions — fully unit-tested.
// Given a property's basics + the state's statewide rules, produce a set of
// plain-English feasibility flags (pass / caution / info) with rule citations.

import { getState, type AduRules } from "./states";
import type { AduType } from "./cost";

export type FlagLevel = "pass" | "caution" | "info";

export interface FeasibilityFlag {
  level: FlagLevel;
  title: string;
  detail: string;
}

export interface FeasibilityInput {
  stateSlug: string;
  aduType: AduType;
  sqft: number;
  lotSqft?: number;
  nearTransit?: boolean;
  ownerOccupies?: boolean;
}

export interface FeasibilityResult {
  verdict: "likely" | "maybe" | "local"; // overall headline
  headline: string;
  flags: FeasibilityFlag[];
  citation: string;
}

function sizeFlag(rules: AduRules, aduType: AduType, sqft: number): FeasibilityFlag {
  if (aduType === "jadu") {
    return sqft <= 500
      ? { level: "pass", title: "Size OK for a JADU", detail: "Junior ADUs are capped at 500 sq ft and must be inside the existing home." }
      : { level: "caution", title: "Too large for a JADU", detail: "A junior ADU cannot exceed 500 sq ft. Consider a detached or attached ADU for this size." };
  }
  if (rules.maxDetachedSqft != null) {
    if (sqft <= (rules.guaranteedMinSqft ?? rules.maxDetachedSqft)) {
      return { level: "pass", title: "Size within the guaranteed minimum", detail: `Your ${sqft} sq ft ADU is at or under the ${rules.guaranteedMinSqft ?? rules.maxDetachedSqft} sq ft your city must allow regardless of other rules.` };
    }
    if (sqft <= rules.maxDetachedSqft) {
      return { level: "caution", title: "Size allowed but lot-dependent", detail: `Detached ADUs up to ${rules.maxDetachedSqft} sq ft are generally allowed, but cities may scale the maximum to your lot. Confirm locally.` };
    }
    return { level: "caution", title: "Above the typical state maximum", detail: `${sqft} sq ft exceeds the ${rules.maxDetachedSqft} sq ft commonly allowed for a detached ADU in this state. A variance or a smaller design may be needed.` };
  }
  return { level: "info", title: "Size set locally", detail: "This state leaves ADU size limits to your city — typical caps run 600–1,200 sq ft. Check your local code." };
}

function parkingFlag(rules: AduRules, nearTransit?: boolean): FeasibilityFlag {
  if (rules.statewideLaw && nearTransit) {
    return { level: "pass", title: "No extra parking likely required", detail: rules.parkingNote };
  }
  return { level: "info", title: "Parking", detail: rules.parkingNote };
}

function ownerOccFlag(rules: AduRules, aduType: AduType, ownerOccupies?: boolean): FeasibilityFlag {
  if (aduType === "jadu") {
    return { level: "caution", title: "Owner-occupancy usually required for JADUs", detail: "Most states still require the owner to live on-site (in the home or the JADU) when renting out a junior ADU." };
  }
  if (rules.ownerOccupancyRequired === false) {
    return { level: "pass", title: "No owner-occupancy requirement", detail: "You can rent out both the main home and the ADU — you do not have to live on the property." };
  }
  if (rules.ownerOccupancyRequired === true) {
    return { level: "caution", title: "Owner-occupancy required", detail: "You must live on the property to rent out the ADU." };
  }
  return { level: "info", title: "Owner-occupancy varies", detail: ownerOccupies === false ? "Some cities require the owner to live on-site to rent an ADU — confirm locally before planning a pure rental." : "Owner-occupancy rules are set locally in this state." };
}

function lotCoverageFlag(input: FeasibilityInput): FeasibilityFlag | null {
  if (!input.lotSqft || input.lotSqft <= 0) return null;
  // A detached/garage ADU adds ground-floor footprint ≈ its size (JADU/attached add little).
  const footprint = input.aduType === "jadu" || input.aduType === "attached" ? 0 : input.sqft;
  const coverage = footprint / input.lotSqft;
  if (footprint === 0) {
    return { level: "pass", title: "Lot size not a constraint", detail: "A JADU or attached ADU adds little new footprint, so lot coverage is rarely an issue." };
  }
  if (coverage > 0.4) {
    return { level: "caution", title: "Tight lot for this size", detail: `A ${input.sqft} sq ft footprint covers about ${Math.round(coverage * 100)}% of a ${input.lotSqft.toLocaleString()} sq ft lot. Most cities cap rear-yard/lot coverage, so a smaller unit or a conversion may fit better.` };
  }
  return { level: "pass", title: "Lot has room", detail: `A ${input.sqft} sq ft ADU uses about ${Math.round(coverage * 100)}% of your ${input.lotSqft.toLocaleString()} sq ft lot — comfortably within typical coverage limits.` };
}

function approvalFlag(rules: AduRules): FeasibilityFlag | null {
  if (rules.approvalDays != null) {
    return { level: "pass", title: `Ministerial approval in ${rules.approvalDays} days`, detail: `By law your city must approve a complete ADU application within ${rules.approvalDays} days, without discretionary review or a public hearing.` };
  }
  return null;
}

export function assessFeasibility(input: FeasibilityInput): FeasibilityResult {
  const state = getState(input.stateSlug);
  const rules = state ? state.rules : getState("california")!.rules; // fallback unused in practice
  const flags: FeasibilityFlag[] = [];

  flags.push(sizeFlag(rules, input.aduType, input.sqft));
  if (rules.setbackFt != null) {
    flags.push({ level: "pass", title: `${rules.setbackFt} ft setback`, detail: `State law caps the side and rear setback at ${rules.setbackFt} ft, so even a tight lot usually works.` });
  }
  flags.push(parkingFlag(rules, input.nearTransit));
  flags.push(ownerOccFlag(rules, input.aduType, input.ownerOccupies));
  const lotFlag = lotCoverageFlag(input);
  if (lotFlag) flags.push(lotFlag);
  const appr = approvalFlag(rules);
  if (appr) flags.push(appr);
  if (rules.feeWaiverSqft != null && input.sqft < rules.feeWaiverSqft) {
    flags.push({ level: "pass", title: "Impact fees waived", detail: `ADUs under ${rules.feeWaiverSqft} sq ft are exempt from impact fees in this state — a saving of several thousand dollars.` });
  }

  const verdict: FeasibilityResult["verdict"] = rules.statewideLaw
    ? (flags.some((f) => f.level === "caution") ? "maybe" : "likely")
    : "local";
  const headline =
    verdict === "likely"
      ? `Good news — building an ADU in ${state?.name ?? "your state"} is very likely allowed.`
      : verdict === "maybe"
      ? `An ADU in ${state?.name ?? "your state"} is allowed, with a couple of things to confirm.`
      : `ADU rules in ${state?.name ?? "your state"} are set by your city — here's what to check.`;

  return { verdict, headline, flags, citation: rules.citation };
}
