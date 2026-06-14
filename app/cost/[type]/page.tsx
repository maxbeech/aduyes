import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ADU_TYPES, getAduType, estimateCost, formatUSD } from "@/lib/cost";
import { STATES } from "@/lib/states";
import { costMetaTitle, costMetaDescription, breadcrumbLd } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return ADU_TYPES.map((t) => ({ type: t.slug }));
}

type Props = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const t = getAduType(type);
  if (!t) return {};
  const title = costMetaTitle(t);
  const description = costMetaDescription(t);
  return { title, description, alternates: { canonical: `${site.url}/cost/${t.slug}` } };
}

export default async function CostTypePage({ params }: Props) {
  const { type } = await params;
  const t = getAduType(type);
  if (!t) notFound();

  // Sort states by cost for a 600 sq ft unit of this type, cheapest first.
  const rows = STATES.map((s) => ({ s, c: estimateCost({ stateSlug: s.slug, aduType: t.type, sqft: 600 }) }))
    .sort((a, b) => a.c.mid - b.c.mid);

  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([
        { name: "Home", url: site.url },
        { name: `${t.label} ADU cost`, url: `${site.url}/cost/${t.slug}` },
      ])) }} />
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link> <span className="px-1">/</span>
        <span className="text-slate-700">{t.label} cost</span>
      </nav>

      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.label} ADU Cost</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">{t.blurb}</p>
        <p className="mt-3 text-slate-700">
          Nationally a {t.label.toLowerCase()} ADU runs{" "}
          <strong className="text-slate-900">${t.lowPerSqft}–${t.highPerSqft}/sq ft</strong> turnkey.
          Below is a 600 sq ft example for every state, adjusted for local construction costs.
        </p>
      </header>

      <section>
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr><th className="px-4 py-3 font-medium">State</th><th className="px-4 py-3 font-medium">600 sq ft estimate</th><th className="px-4 py-3 font-medium">$/sq ft</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(({ s, c }) => (
                <tr key={s.slug} className="bg-white">
                  <td className="px-4 py-3"><Link href={`/${s.slug}`} className="font-medium text-emerald-700 hover:underline">{s.name}</Link></td>
                  <td className="px-4 py-3 text-slate-900">{formatUSD(c.low)}–{formatUSD(c.high)}</td>
                  <td className="px-4 py-3 text-slate-600">{formatUSD(c.perSqftLow)}–{formatUSD(c.perSqftHigh)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900">Other ADU types</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {ADU_TYPES.filter((x) => x.slug !== t.slug).map((x) => (
            <Link key={x.slug} href={`/cost/${x.slug}`} className="rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">{x.label}</Link>
          ))}
        </div>
      </section>

      <p className="text-xs leading-relaxed text-slate-400">{site.disclaimer}</p>
    </div>
  );
}
