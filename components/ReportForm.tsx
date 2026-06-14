"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ADU_TYPES } from "@/lib/cost";
import { buildLeadMailto, isValidEmail } from "@/lib/lead";

// Honest lead capture: composes a real, prefilled email to the ADUYes inbox via the
// visitor's mail client. No fake "submitted!" state — the lead only sends when the
// visitor actually sends the email. (Upgrade path to a stored backend is documented
// in README under "Lead capture".)
export default function ReportForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || "").trim();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email so we can send your report.");
      return;
    }
    setError(null);
    window.location.href = buildLeadMailto({
      name: String(f.get("name") || ""),
      email,
      zip: String(f.get("zip") || ""),
      aduType: String(f.get("aduType") || ""),
      timeline: String(f.get("timeline") || ""),
    });
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-xl text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-slate-200">Name</label>
          <input id="lead-name" name="name" type="text" autoComplete="name"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none" placeholder="Jane Homeowner" />
        </div>
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-slate-200">Email <span className="text-emerald-400">*</span></label>
          <input id="lead-email" name="email" type="email" required autoComplete="email"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none" placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="lead-zip" className="block text-sm font-medium text-slate-200">Property ZIP</label>
          <input id="lead-zip" name="zip" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={10}
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-emerald-400 focus:outline-none" placeholder="90001" />
        </div>
        <div>
          <label htmlFor="lead-type" className="block text-sm font-medium text-slate-200">ADU type</label>
          <select id="lead-type" name="aduType"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none">
            {ADU_TYPES.map((t) => <option key={t.slug} value={t.label}>{t.label}</option>)}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lead-timeline" className="block text-sm font-medium text-slate-200">Timeline</label>
          <select id="lead-timeline" name="timeline"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white focus:border-emerald-400 focus:outline-none">
            <option>Just researching</option>
            <option>Next 3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
          </select>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-amber-300" role="alert">{error}</p>}
      <button type="submit" className="mt-4 w-full rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400">
        Request my report
      </button>
      {sent && (
        <p className="mt-3 text-sm text-emerald-300" role="status">
          Your email app should now be open with your details — just hit send and we&apos;ll reply with your report. If nothing opened, email us at{" "}
          <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
        </p>
      )}
      <p className="mt-3 text-xs text-slate-400">We use your details only to prepare your report and connect you with vetted ADU builders. No spam.</p>
    </form>
  );
}
