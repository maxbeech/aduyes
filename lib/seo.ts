// Pure builders for page-template meta titles/descriptions, kept here (not inline
// in the page components) so their lengths can be unit-tested for every state,
// city and ADU type. Google truncates titles ~60 and descriptions ~160 chars.

import type { StateData } from "./states";
import type { AduTypeInfo } from "./cost";

export function stateMetaTitle(s: StateData): string {
  return `${s.name} ADU Rules & Cost (2026)`;
}

export function stateMetaDescription(s: StateData): string {
  const regime = s.rules.statewideLaw ? "statewide law" : "local zoning";
  return `What an ADU costs in ${s.name}, plus its rules — ${regime}, size, setbacks, parking and owner-occupancy.`;
}

export function cityMetaTitle(city: string): string {
  return `${city} ADU Rules & Cost (2026)`;
}

export function cityMetaDescription(s: StateData, city: string): string {
  const regime = s.rules.statewideLaw ? "state law" : "local zoning";
  return `ADU rules and cost for ${city}, ${s.name} — what's allowed under ${regime}, plus an instant cost estimate.`;
}

export function costMetaTitle(t: AduTypeInfo): string {
  return `${t.label} ADU Cost (2026): $${t.lowPerSqft}–$${t.highPerSqft}/sq ft`;
}

export function costMetaDescription(t: AduTypeInfo): string {
  return `What a ${t.label.toLowerCase()} ADU costs in 2026 — typical $/sq ft and a price example for every U.S. state.`;
}
