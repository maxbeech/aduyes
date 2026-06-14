import type { Metadata } from "next";
import Link from "next/link";
import { ADU_TYPES } from "@/lib/cost";
import { STATES } from "@/lib/states";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How We Estimate ADU Costs & Feasibility",
  description: "How ADUYes calculates ADU cost, feasibility and rental estimates — the data sources, regional cost index and assumptions behind every number.",
  alternates: { canonical: `${site.url}/methodology` },
};

const statewide = STATES.filter((s) => s.rules.statewideLaw).length;

export default function Methodology() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link> <span className="px-1">/</span>
        <span className="text-slate-700">Methodology</span>
      </nav>
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How we estimate ADU costs &amp; feasibility</h1>
        <p className="mt-3 text-lg text-slate-600">
          Every number on ADUYes is a transparent planning estimate — never a quote. Here is exactly how we calculate it,
          so you can judge how much weight to give it.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Construction cost</h2>
        <p className="mt-2 text-slate-700">
          We start from national turnkey cost ranges per square foot for each ADU type (including design, permits and site work),
          drawn from 2024–2025 ADU cost surveys, then scale them by a <strong>regional cost index</strong> for your state
          (national average = 1.00) that reflects local labor and materials pricing.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500"><tr><th className="px-4 py-2 font-medium">ADU type</th><th className="px-4 py-2 font-medium">National $/sq ft (turnkey)</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {ADU_TYPES.map((t) => (
                <tr key={t.slug} className="bg-white"><td className="px-4 py-2 text-slate-900">{t.label}</td><td className="px-4 py-2 text-slate-700">${t.lowPerSqft}–${t.highPerSqft}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-slate-500">The mid-point is split into ~70% construction, ~18% design &amp; permits, and a type-dependent site-work share (lowest for conversions and JADUs, highest for detached new builds).</p>
        <p className="mt-2 text-sm text-slate-500">On city pages we apply an additional <strong>metro adjustment</strong> for higher- and lower-cost markets (for example, San Francisco runs above the California average), so city estimates are more local than the state baseline.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Feasibility &amp; rules</h2>
        <p className="mt-2 text-slate-700">
          {statewide} states (plus a growing list of others) have a statewide ADU law that limits what cities can restrict.
          For those, we apply the published statute&apos;s standards (size guarantees, setbacks, parking and owner-occupancy)
          and cite the law on each page. For states without one, we say plainly that local zoning governs — we never invent a statute.
          We also flag lot-coverage risk when a unit&apos;s footprint is large relative to the lot you enter.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Rental income &amp; ROI</h2>
        <p className="mt-2 text-slate-700">
          Estimated rent uses a national ADU rent band per square foot scaled by the same regional index, with a damped
          size adjustment (small units rent at a higher $/sq ft). Gross yield is annual rent ÷ build cost; simple payback is
          build cost ÷ annual rent after a 7% vacancy allowance, before financing and maintenance. The financing figure is a
          standard amortized monthly payment on the build cost over 20 years at an illustrative 7.5% rate — adjust for your
          actual loan terms.
        </p>
      </section>

      <section className="rounded-xl bg-amber-50 p-5 ring-1 ring-amber-100">
        <h2 className="text-base font-semibold text-amber-900">Important</h2>
        <p className="mt-1 text-sm text-amber-800">{site.disclaimer}</p>
      </section>

      <p><Link href="/" className="text-sm font-medium text-emerald-700 hover:underline">← Back to the calculator</Link></p>
    </div>
  );
}
