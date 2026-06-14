// Pure lead-routing helpers — single source of truth for how a feasibility-report
// request becomes an email. Kept out of the component so it is fully unit-testable
// (encoding, edge cases, field order). The component only collects the fields.

import { site } from "./site";

export interface LeadFields {
  name?: string;
  email: string;
  zip?: string;
  aduType?: string;
  timeline?: string;
  notes?: string;
}

// Reject whitespace, @, and HTML/quote metacharacters in any part of the address.
const EMAIL_RE = /^[^\s@<>"'`]+@[^\s@<>"'`]+\.[^\s@<>"'`]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

/** Build the body text of the lead email (newline-separated, human-readable). */
export function buildLeadBody(f: LeadFields): string {
  const dash = "—";
  return [
    "Please send my detailed ADU feasibility report.",
    "",
    `Name: ${f.name?.trim() || dash}`,
    `Email: ${f.email.trim()}`,
    `Property ZIP: ${f.zip?.trim() || dash}`,
    `ADU type: ${f.aduType?.trim() || dash}`,
    `Timeline: ${f.timeline?.trim() || dash}`,
    `Notes: ${f.notes?.trim() || dash}`,
  ].join("\n");
}

/** Build a fully-encoded mailto: URL to the ADUYes inbox for a lead. */
export function buildLeadMailto(f: LeadFields): string {
  const subject = encodeURIComponent("ADU feasibility report request");
  const body = encodeURIComponent(buildLeadBody(f));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}
