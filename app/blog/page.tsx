import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/posts";
import { site } from "@/lib/site";

// ISR: prerendered at build and revalidated weekly (604800s) — keeps pages on
// Vercel's edge cache (Fast Origin Transfer) while staying fresh if data changes.
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "ADU Guides — Costs, Rules & How-To",
  description: "Practical guides to building an accessory dwelling unit: real costs by type, state rules, financing, and ADU vs JADU.",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogIndex() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">ADU Guides</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Everything you need to plan an ADU — real costs, state rules, financing and the trade-offs between unit types.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-400 hover:shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{p.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            <p className="mt-3 text-xs text-slate-500">{p.readingMinutes} min read</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
