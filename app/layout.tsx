import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: site.url },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-700 text-sm font-bold text-white">A</span>
              <span>{site.name}</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm text-slate-600">
              <Link href="/california" className="hover:text-slate-900">California</Link>
              <Link href="/states" className="hover:text-slate-900">All states</Link>
              <Link href="/blog" className="hover:text-slate-900">Guides</Link>
              <Link href="/#report" className="rounded-lg bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-slate-700">
                Feasibility report
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-slate-500">
            <p className="font-medium text-slate-700">{site.name}</p>
            <p className="mt-1 max-w-2xl">
              {site.name} provides informational ADU feasibility and cost estimates and is not a
              substitute for advice from your city planning department, an architect or a licensed
              contractor. Always confirm zoning rules and pricing locally before relying on them.
            </p>
            <p className="mt-3 flex flex-wrap gap-4 text-xs">
              <Link href="/states" className="text-slate-500 hover:text-slate-900">ADU rules by state</Link>
              <Link href="/blog" className="text-slate-500 hover:text-slate-900">Guides</Link>
              <Link href="/methodology" className="text-slate-500 hover:text-slate-900">Methodology</Link>
            </p>
            <p className="mt-4 text-xs text-slate-500">© 2026 {site.name}. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
