import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import ReportForm from "@/components/ReportForm";
import { STATES } from "@/lib/states";
import { ADU_TYPES } from "@/lib/cost";
import { POSTS } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free ADU Cost & Feasibility Calculator",
  description:
    "Can you build an ADU? Get an instant cost estimate and check your state's ADU rules — size, setbacks, parking and owner-occupancy — free in 60 seconds.",
  alternates: { canonical: site.url },
};

const FAQ = [
  { q: "How accurate is the ADU cost estimate?", a: "The calculator uses 2024–2025 turnkey cost ranges per ADU type, scaled by a regional construction-cost index for your state. It returns a realistic low–high range for planning. Your final price depends on your specific lot, finishes and contractor — always get a local quote." },
  { q: "Can I build an ADU on my property?", a: "In states with a statewide ADU law (like California, Washington and Oregon), almost every single-family lot qualifies for at least one ADU by right. Elsewhere it depends on local zoning. Our calculator flags the rules that apply to your state and the things to confirm with your city." },
  { q: "What's the difference between an ADU and a JADU?", a: "A JADU (junior ADU) is up to 500 sq ft and must be built inside your existing home, usually with an owner-occupancy requirement. A full ADU can be detached, attached or a garage conversion, larger, and in most states rentable without living on-site." },
  { q: "Is ADUYes free?", a: "Yes — the feasibility checker and cost calculator are free. We offer an optional paid detailed feasibility report and can connect you with vetted ADU builders in your area." },
];

export default function Home() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="space-y-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* Hero */}
      <section className="text-center">
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
          Free ADU feasibility &amp; cost calculator
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Can you build an ADU? Find out in 60 seconds.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Check the accessory dwelling unit rules in your state — size, setbacks, parking and
          owner-occupancy — and get an instant cost estimate for a detached ADU, garage
          conversion or junior ADU.
        </p>
      </section>

      {/* Calculator */}
      <section id="calculator">
        <Calculator syncUrl />
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-center text-2xl font-bold text-slate-900">How ADUYes works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { n: "1", t: "Tell us your property", d: "Pick your state, the ADU type you're considering and a rough size." },
            { n: "2", t: "See feasibility + cost", d: "We apply your state's ADU law and a regional cost index to flag what's allowed and what it'll cost." },
            { n: "3", t: "Go further", d: "Get a detailed feasibility report or connect with vetted ADU builders in your area." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-700 font-bold text-white">{s.n}</span>
              <h3 className="mt-4 font-semibold text-slate-900">{s.t}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ADU types */}
      <section>
        <h2 className="text-center text-2xl font-bold text-slate-900">ADU types &amp; what they cost</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {ADU_TYPES.map((t) => (
            <Link key={t.slug} href={`/cost/${t.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-400 hover:shadow-sm">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold text-slate-900">{t.label}</h3>
                <span className="text-sm font-medium text-emerald-700">${t.lowPerSqft}–${t.highPerSqft}/sq ft</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{t.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Report / pricing */}
      <section id="report" className="rounded-2xl bg-slate-900 p-8 text-center text-white">
        <h2 className="text-2xl font-bold">Get your detailed feasibility report</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">
          A personalised PDF with your exact size and setback allowances, fee estimates, a phased
          budget and the documents your city requires — plus an intro to vetted ADU builders near you.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <span className="text-3xl font-bold">$49</span>
          <span className="text-sm text-slate-400">one-time · 100% applied as credit if you build with a partner</span>
        </div>
        <ReportForm />
      </section>

      {/* States */}
      <section>
        <h2 className="text-center text-2xl font-bold text-slate-900">ADU rules by state</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {STATES.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`} className={`rounded-full px-3 py-1.5 text-sm ring-1 transition ${
              s.rules.statewideLaw ? "bg-emerald-50 text-emerald-800 ring-emerald-200 hover:bg-emerald-100" : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
            }`}>
              {s.name}{s.rules.statewideLaw ? " ✓" : ""}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">✓ = statewide ADU law that limits local bans.</p>
      </section>

      {/* Guides */}
      <section>
        <h2 className="text-center text-2xl font-bold text-slate-900">ADU guides</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {POSTS.slice(0, 4).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-400">
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{p.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center"><Link href="/blog" className="text-sm font-medium text-emerald-700 hover:underline">All guides →</Link></p>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-center text-2xl font-bold text-slate-900">Frequently asked questions</h2>
        <div className="mx-auto mt-6 max-w-3xl space-y-4">
          {FAQ.map((f) => (
            <details key={f.q} className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-medium text-slate-900">{f.q}</summary>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
