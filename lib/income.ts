// ADU rental-income + ROI estimator. Pure functions — fully unit-tested.
// Rent is estimated from a national ADU rent-per-sq-ft band scaled by the state's
// regional cost index (rent and construction cost both track regional cost of
// living). These are planning estimates, clearly labelled in the UI.

import { getState } from "./states";

// National monthly rent band for a small ADU, $/sq ft/month (turnkey, furnished-agnostic).
const RENT_PER_SQFT_LOW = 1.6;
const RENT_PER_SQFT_HIGH = 2.6;
// Small units rent at a higher $/sq ft; we damp the size effect so a 1,000 sq ft
// unit doesn't look like 2.5x a 400 sq ft unit's rent.
const SIZE_REFERENCE = 600;

export interface RentInput {
  stateSlug: string;
  sqft: number;
}

export interface RentEstimate {
  monthlyLow: number;
  monthlyHigh: number;
  monthlyMid: number;
}

function round(n: number, to = 25): number {
  return Math.round(n / to) * to;
}

/** Estimate the monthly rent range for an ADU of a given size in a given state. */
export function estimateRent(input: RentInput): RentEstimate {
  const state = getState(input.stateSlug);
  const index = state ? state.costIndex : 1.0;
  const sqft = Math.max(100, Math.min(input.sqft, 1500));
  // Damped size scaling: blend actual sqft with the reference so $/sqft eases off as size grows.
  const effectiveSqft = SIZE_REFERENCE + (sqft - SIZE_REFERENCE) * 0.7;
  const low = round(RENT_PER_SQFT_LOW * index * effectiveSqft);
  const high = round(RENT_PER_SQFT_HIGH * index * effectiveSqft);
  return { monthlyLow: low, monthlyHigh: high, monthlyMid: round((low + high) / 2) };
}

export interface RoiInput {
  buildCostMid: number;
  monthlyRentMid: number;
  vacancyRate?: number; // fraction lost to vacancy + non-payment (default 0.07)
}

export interface RoiEstimate {
  annualGrossRent: number;
  annualNetRent: number; // after vacancy allowance (before financing/maintenance)
  grossYieldPct: number; // annualGrossRent / buildCost
  paybackYears: number; // buildCost / annualNetRent
}

export interface LoanInput {
  principal: number;
  annualRatePct?: number; // default 7.5%
  years?: number; // default 20
}

export interface LoanEstimate {
  monthlyPayment: number;
  annualRatePct: number;
  years: number;
  totalInterest: number;
}

/** Standard amortized monthly payment for financing an ADU build. */
export function estimateLoanPayment(input: LoanInput): LoanEstimate {
  const annualRatePct = input.annualRatePct ?? 7.5;
  const years = input.years ?? 20;
  const principal = Math.max(0, input.principal);
  const n = years * 12;
  const r = annualRatePct / 100 / 12;
  let monthly: number;
  if (r === 0) monthly = principal / n;
  else monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyPayment = Math.round(monthly);
  return {
    monthlyPayment,
    annualRatePct,
    years,
    totalInterest: Math.round(monthlyPayment * n - principal),
  };
}

/** Estimate gross yield and simple payback for an ADU rental. */
export function estimateRoi(input: RoiInput): RoiEstimate {
  const vacancy = input.vacancyRate ?? 0.07;
  const annualGrossRent = input.monthlyRentMid * 12;
  const annualNetRent = Math.round(annualGrossRent * (1 - vacancy));
  const grossYieldPct = input.buildCostMid > 0 ? Math.round((annualGrossRent / input.buildCostMid) * 1000) / 10 : 0;
  const paybackYears = annualNetRent > 0 ? Math.round((input.buildCostMid / annualNetRent) * 10) / 10 : 0;
  return { annualGrossRent, annualNetRent, grossYieldPct, paybackYears };
}
