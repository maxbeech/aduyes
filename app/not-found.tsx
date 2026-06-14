import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <p className="text-sm font-semibold text-emerald-700">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-slate-600">
        The page may have moved. Try the ADU calculator, browse rules by state, or read a guide.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl bg-emerald-700 px-5 py-2.5 font-medium text-white hover:bg-emerald-800">Open the calculator</Link>
        <Link href="/states" className="rounded-xl bg-white px-5 py-2.5 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">ADU rules by state</Link>
        <Link href="/blog" className="rounded-xl bg-white px-5 py-2.5 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">Guides</Link>
      </div>
    </div>
  );
}
