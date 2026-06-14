import type { Metadata } from "next";
import Link from "next/link";
import { STATES } from "@/lib/states";
import { estimateCost, formatUSD } from "@/lib/cost";
import { site } from "@/lib/site";

// ISR: prerendered at build and revalidated weekly (604800s) — keeps pages on
// Vercel's edge cache (Fast Origin Transfer) while staying fresh if data changes.
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "ADU Rules & Cost by State (2026)",
  description: "Browse accessory dwelling unit (ADU) rules and cost estimates for every U.S. state. See which states have a statewide ADU law and what a backyard unit costs near you.",
  alternates: { canonical: `${site.url}/states` },
};

export default function StatesIndex() {
  const withLaw = STATES.filter((s) => s.rules.statewideLaw);
  const local = STATES.filter((s) => !s.rules.statewideLaw);

  function Card({ slug, name, statewide }: { slug: string; name: string; statewide: boolean }) {
    const c = estimateCost({ stateSlug: slug, aduType: "detached", sqft: 700 });
    return (
      <Link href={`/${slug}`} className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-400 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-900">{name}</span>
          {statewide && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">Statewide law</span>}
        </div>
        <p className="mt-1 text-sm text-slate-500">700 sq ft ADU ≈ {formatUSD(c.low)}–{formatUSD(c.high)}</p>
      </Link>
    );
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">ADU Rules &amp; Cost by State</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Pick your state to see what an accessory dwelling unit costs there and the rules that apply —
          size limits, setbacks, parking and owner-occupancy.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">States with a statewide ADU law</h2>
        <p className="mt-1 text-sm text-slate-500">These states limit what cities can restrict, making an ADU much easier to build.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {withLaw.map((s) => <Card key={s.slug} slug={s.slug} name={s.name} statewide />)}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">States where local zoning governs</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {local.map((s) => <Card key={s.slug} slug={s.slug} name={s.name} statewide={false} />)}
        </div>
      </section>
    </div>
  );
}
