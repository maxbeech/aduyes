import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import { STATES, getState, citySlug } from "@/lib/states";
import { estimateCost, formatUSD, ADU_TYPES } from "@/lib/cost";
import { stateMetaTitle, stateMetaDescription, breadcrumbLd } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

type Props = { params: Promise<{ state: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const s = getState(state);
  if (!s) return {};
  const title = stateMetaTitle(s);
  const description = stateMetaDescription(s);
  return {
    title, description,
    alternates: { canonical: `${site.url}/${s.slug}` },
    openGraph: { title, description, url: `${site.url}/${s.slug}`, type: "article" },
  };
}

export default async function StatePage({ params }: Props) {
  const { state } = await params;
  const s = getState(state);
  if (!s) notFound();

  // Headline cost example: a 700 sq ft detached ADU in this state.
  const example = estimateCost({ stateSlug: s.slug, aduType: "detached", sqft: 700 });
  const r = s.rules;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} ADU Rules & Cost`,
    about: "Accessory dwelling unit regulations and construction cost",
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/${s.slug}`,
  };

  return (
    <div className="space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([
        { name: "Home", url: site.url },
        { name: "States", url: `${site.url}/states` },
        { name: s.name, url: `${site.url}/${s.slug}` },
      ])) }} />

      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link> <span className="px-1">/</span>
        <Link href="/states" className="hover:text-slate-900">States</Link> <span className="px-1">/</span>
        <span className="text-slate-700">{s.name}</span>
      </nav>

      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ADU Rules &amp; Cost in {s.name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          A 700 sq ft detached ADU in {s.name} typically costs{" "}
          <strong className="text-slate-900">{formatUSD(example.low)}–{formatUSD(example.high)}</strong>{" "}
          ({formatUSD(example.perSqftLow)}–{formatUSD(example.perSqftHigh)}/sq ft). Here is what the rules allow.
        </p>
        <span className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-medium ring-1 ${
          r.statewideLaw ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-amber-50 text-amber-800 ring-amber-200"
        }`}>
          {r.statewideLaw ? `Statewide ADU law: ${r.citation}` : "Local zoning governs — no statewide ADU law"}
        </span>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-slate-900">{s.name} ADU rules at a glance</h2>
        <p className="mt-3 max-w-3xl text-slate-700">{r.summary}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Statewide law", r.statewideLaw ? "Yes" : "No — local rules"],
            ["Max detached size", r.maxDetachedSqft ? `${r.maxDetachedSqft} sq ft` : "Set locally"],
            ["Guaranteed minimum", r.guaranteedMinSqft ? `${r.guaranteedMinSqft} sq ft` : "Set locally"],
            ["Setback", r.setbackFt != null ? `${r.setbackFt} ft` : "Set locally"],
            ["Owner-occupancy", r.ownerOccupancyRequired === false ? "Not required" : r.ownerOccupancyRequired === true ? "Required" : "Varies locally"],
            ["Approval time", r.approvalDays ? `${r.approvalDays} days (ministerial)` : "Set locally"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{k}</dt>
              <dd className="mt-1 font-semibold text-slate-900">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-slate-500">Parking: {r.parkingNote}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900">Estimate your {s.name} ADU</h2>
        <p className="mt-2 text-slate-600">Pre-set to {s.name}. Adjust the type and size for your project.</p>
        <div className="mt-6"><Calculator defaultStateSlug={s.slug} /></div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900">Cost by ADU type in {s.name}</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr><th className="px-4 py-3 font-medium">ADU type</th><th className="px-4 py-3 font-medium">600 sq ft</th><th className="px-4 py-3 font-medium">$/sq ft</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ADU_TYPES.map((t) => {
                const c = estimateCost({ stateSlug: s.slug, aduType: t.type, sqft: 600 });
                return (
                  <tr key={t.slug} className="bg-white">
                    <td className="px-4 py-3"><Link href={`/cost/${t.slug}`} className="font-medium text-emerald-700 hover:underline">{t.label}</Link></td>
                    <td className="px-4 py-3 text-slate-900">{formatUSD(c.low)}–{formatUSD(c.high)}</td>
                    <td className="px-4 py-3 text-slate-600">{formatUSD(c.perSqftLow)}–{formatUSD(c.perSqftHigh)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {s.cities.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-900">ADU rules by city in {s.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {s.cities.map((c) => (
              <Link key={c} href={`/${s.slug}/${citySlug(c)}`} className="rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">
                {c} ADU rules
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-xs leading-relaxed text-slate-500">{site.disclaimer}</p>
    </div>
  );
}
