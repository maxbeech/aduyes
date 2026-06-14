"use client";

import { useMemo, useState } from "react";
import { STATES } from "@/lib/states";
import { ADU_TYPES, estimateCost, formatUSD, type AduType } from "@/lib/cost";
import { assessFeasibility, type FlagLevel } from "@/lib/feasibility";
import { estimateRent, estimateRoi } from "@/lib/income";
import { site } from "@/lib/site";

const LEVEL_STYLES: Record<FlagLevel, string> = {
  pass: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  caution: "bg-amber-50 text-amber-800 ring-amber-100",
  info: "bg-slate-50 text-slate-700 ring-slate-200",
};
const LEVEL_ICON: Record<FlagLevel, string> = { pass: "✓", caution: "!", info: "i" };

export default function Calculator({ defaultStateSlug }: { defaultStateSlug?: string }) {
  const [stateSlug, setStateSlug] = useState(defaultStateSlug ?? "california");
  const [aduType, setAduType] = useState<AduType>("detached");
  const [sqft, setSqft] = useState(700);
  const [lotSqft, setLotSqft] = useState(6000);
  const [nearTransit, setNearTransit] = useState(true);
  const [ownerOccupies, setOwnerOccupies] = useState(true);

  const cost = useMemo(() => estimateCost({ stateSlug, aduType, sqft }), [stateSlug, aduType, sqft]);
  const feas = useMemo(
    () => assessFeasibility({ stateSlug, aduType, sqft, lotSqft, nearTransit, ownerOccupies }),
    [stateSlug, aduType, sqft, lotSqft, nearTransit, ownerOccupies]
  );
  const rent = useMemo(() => estimateRent({ stateSlug, sqft }), [stateSlug, sqft]);
  const roi = useMemo(() => estimateRoi({ buildCostMid: cost.mid, monthlyRentMid: rent.monthlyMid }), [cost.mid, rent.monthlyMid]);
  const stateName = STATES.find((s) => s.slug === stateSlug)?.name ?? "your state";

  const comp = cost.components;
  const pct = (n: number) => `${Math.round((n / cost.mid) * 100)}%`;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Inputs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Your property</h2>

        <label htmlFor="adu-state" className="mt-4 block text-sm font-medium text-slate-700">State</label>
        <select
          id="adu-state"
          value={stateSlug}
          onChange={(e) => setStateSlug(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-emerald-500 focus:outline-none"
        >
          {STATES.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>

        <span id="adu-type-label" className="mt-4 block text-sm font-medium text-slate-700">ADU type</span>
        <div role="group" aria-labelledby="adu-type-label" className="mt-1 grid grid-cols-2 gap-2">
          {ADU_TYPES.map((t) => (
            <button
              key={t.slug}
              type="button"
              aria-pressed={aduType === t.type}
              onClick={() => setAduType(t.type)}
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                aduType === t.type
                  ? "border-emerald-500 bg-emerald-50 font-medium text-emerald-800"
                  : "border-slate-300 text-slate-700 hover:border-slate-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label htmlFor="adu-size" className="mt-4 flex items-center justify-between text-sm font-medium text-slate-700">
          <span>ADU size</span>
          <span className="font-semibold text-slate-900">{sqft} sq ft</span>
        </label>
        <input
          id="adu-size"
          type="range" min={200} max={1200} step={50} value={sqft}
          aria-label="ADU size in square feet"
          onChange={(e) => setSqft(Number(e.target.value))}
          className="mt-2 w-full accent-emerald-600"
        />

        <label htmlFor="lot-size" className="mt-4 flex items-center justify-between text-sm font-medium text-slate-700">
          <span>Lot size</span>
          <span className="font-semibold text-slate-900">{lotSqft.toLocaleString()} sq ft</span>
        </label>
        <input
          id="lot-size"
          type="range" min={2000} max={20000} step={500} value={lotSqft}
          aria-label="Lot size in square feet"
          onChange={(e) => setLotSqft(Number(e.target.value))}
          className="mt-2 w-full accent-emerald-600"
        />

        <div className="mt-4 space-y-2">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={nearTransit} onChange={(e) => setNearTransit(e.target.checked)} className="accent-emerald-600" />
            Within ½ mile of public transit
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={ownerOccupies} onChange={(e) => setOwnerOccupies(e.target.checked)} className="accent-emerald-600" />
            I will live on the property
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Estimated cost in {stateName}</h2>
        <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          {formatUSD(cost.low)} <span className="text-slate-500">–</span> {formatUSD(cost.high)}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          ≈ {formatUSD(cost.perSqftLow)}–{formatUSD(cost.perSqftHigh)}/sq ft turnkey · midpoint {formatUSD(cost.mid)}
        </p>

        {/* Cost breakdown bar */}
        <div className="mt-4">
          <div className="flex h-2.5 overflow-hidden rounded-full" aria-hidden="true">
            <div className="bg-emerald-500" style={{ width: pct(comp.hard) }} />
            <div className="bg-sky-400" style={{ width: pct(comp.soft) }} />
            <div className="bg-amber-400" style={{ width: pct(comp.site) }} />
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-2 text-xs text-slate-600">
            <div><dt className="font-medium text-slate-900">{formatUSD(comp.hard)}</dt><dd>Construction</dd></div>
            <div><dt className="font-medium text-slate-900">{formatUSD(comp.soft)}</dt><dd>Design &amp; permits</dd></div>
            <div><dt className="font-medium text-slate-900">{formatUSD(comp.site)}</dt><dd>Site work</dd></div>
          </dl>
        </div>

        <div className={`mt-5 rounded-xl px-4 py-3 text-sm font-medium ring-1 ${
          feas.verdict === "likely" ? LEVEL_STYLES.pass : feas.verdict === "maybe" ? LEVEL_STYLES.caution : LEVEL_STYLES.info
        }`}>
          {feas.headline}
        </div>

        <ul className="mt-4 space-y-2">
          {feas.flags.map((f, i) => (
            <li key={i} className={`flex gap-3 rounded-lg px-3 py-2 text-sm ring-1 ${LEVEL_STYLES[f.level]}`}>
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/70 text-xs font-bold">
                {LEVEL_ICON[f.level]}
              </span>
              <span><strong className="font-semibold">{f.title}.</strong> {f.detail}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-xs text-slate-500">Rule basis: {feas.citation}</p>

        {/* Rental income & ROI */}
        <div className="mt-5 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">If you rent it out</h3>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div><p className="text-base font-bold text-slate-900">{formatUSD(rent.monthlyLow)}–{formatUSD(rent.monthlyHigh)}</p><p className="text-xs text-slate-500">est. rent/mo</p></div>
            <div><p className="text-base font-bold text-slate-900">{roi.grossYieldPct}%</p><p className="text-xs text-slate-500">gross yield</p></div>
            <div><p className="text-base font-bold text-slate-900">{roi.paybackYears} yrs</p><p className="text-xs text-slate-500">payback</p></div>
          </div>
          <p className="mt-2 text-xs text-slate-500">~{formatUSD(roi.annualNetRent)}/yr after a 7% vacancy allowance, before financing &amp; maintenance.</p>
        </div>

        <a href="#report" className="mt-5 block rounded-xl bg-emerald-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-800">
          Get your detailed feasibility report →
        </a>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">{site.disclaimer}</p>
      </div>
    </div>
  );
}
