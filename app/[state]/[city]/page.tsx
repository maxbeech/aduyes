import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import { STATES, findCity, citySlug } from "@/lib/states";
import { estimateCost, formatUSD, cityCostMultiplier } from "@/lib/cost";
import { cityMetaTitle, cityMetaDescription, breadcrumbLd } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return STATES.flatMap((s) => s.cities.map((c) => ({ state: s.slug, city: citySlug(c) })));
}

type Props = { params: Promise<{ state: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params;
  const hit = findCity(state, city);
  if (!hit) return {};
  const title = cityMetaTitle(hit.city);
  const description = cityMetaDescription(hit.state, hit.city);
  return {
    title, description,
    alternates: { canonical: `${site.url}/${hit.state.slug}/${city}` },
    openGraph: { title, description, url: `${site.url}/${hit.state.slug}/${city}`, type: "article" },
  };
}

export default async function CityPage({ params }: Props) {
  const { state, city } = await params;
  const hit = findCity(state, city);
  if (!hit) notFound();
  const { state: s, city: cityName } = hit;
  const r = s.rules;
  const cityMultiplier = cityCostMultiplier(s.slug, city);
  const example = estimateCost({ stateSlug: s.slug, aduType: "detached", sqft: 700, cityMultiplier });
  const conv = estimateCost({ stateSlug: s.slug, aduType: "garage-conversion", sqft: 400, cityMultiplier });
  // Unique, city-specific cost-context line (differentiates each city page + adds accuracy).
  const adjPct = Math.round((cityMultiplier - 1) * 100);
  const costContext =
    adjPct >= 3
      ? `Construction in ${cityName} runs about ${adjPct}% above the ${s.name} average, so budget toward the higher end of these ranges.`
      : adjPct <= -3
      ? `Construction in ${cityName} tends to run about ${Math.abs(adjPct)}% below the ${s.name} average, so costs here are on the lower end.`
      : `Construction costs in ${cityName} track close to the ${s.name} state average.`;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${cityName} ADU Rules & Cost`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/${s.slug}/${city}`,
  };

  return (
    <div className="space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([
        { name: "Home", url: site.url },
        { name: s.name, url: `${site.url}/${s.slug}` },
        { name: cityName, url: `${site.url}/${s.slug}/${city}` },
      ])) }} />

      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link> <span className="px-1">/</span>
        <Link href={`/${s.slug}`} className="hover:text-slate-900">{s.name}</Link> <span className="px-1">/</span>
        <span className="text-slate-700">{cityName}</span>
      </nav>

      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Can You Build an ADU in {cityName}?
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          {r.statewideLaw
            ? `Yes — ${cityName} is governed by ${s.name}'s statewide ADU law, which limits what the city can restrict. A 700 sq ft detached ADU here runs about ${formatUSD(example.low)}–${formatUSD(example.high)}.`
            : `ADU rules in ${cityName} are set by local zoning in ${s.name}. Many ${s.name} cities allow ADUs — here's what to check, plus typical costs (${formatUSD(example.low)}–${formatUSD(example.high)} for a 700 sq ft detached unit).`}
        </p>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">{costContext}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Detached ADU (700 sq ft)", `${formatUSD(example.low)}–${formatUSD(example.high)}`],
          ["Garage conversion (400 sq ft)", `${formatUSD(conv.low)}–${formatUSD(conv.high)}`],
          ["Statewide protection", r.statewideLaw ? "Yes" : "Local rules"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{k}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{v}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900">What applies in {cityName}</h2>
        <p className="mt-3 max-w-3xl text-slate-700">{r.summary}</p>
        <p className="mt-3 text-sm text-slate-500">
          {r.statewideLaw
            ? `Because ${s.name} has a statewide ADU law (${r.citation}), ${cityName} must follow these minimums even where its older zoning code is stricter. Confirm fees and design standards with the ${cityName} planning department.`
            : `Check the ${cityName} planning or building department for ADU size, setback and parking rules before you design.`}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900">Estimate your {cityName} ADU cost</h2>
        <div className="mt-6"><Calculator defaultStateSlug={s.slug} defaultCityMultiplier={cityMultiplier} /></div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-slate-900">Other {s.name} cities</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {s.cities.filter((c) => c !== cityName).slice(0, 12).map((c) => (
            <Link key={c} href={`/${s.slug}/${citySlug(c)}`} className="rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">{c}</Link>
          ))}
        </div>
      </section>

      <p className="text-xs leading-relaxed text-slate-500">{site.disclaimer}</p>
    </div>
  );
}
