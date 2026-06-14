"use client";

import { useMemo, useState } from "react";
import { STATES } from "@/lib/states";
import { ADU_TYPES, estimateCost, formatUSD, type AduType } from "@/lib/cost";
import { assessFeasibility, type FlagLevel } from "@/lib/feasibility";
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
  const [nearTransit, setNearTransit] = useState(true);
  const [ownerOccupies, setOwnerOccupies] = useState(true);

  const cost = useMemo(() => estimateCost({ stateSlug, aduType, sqft }), [stateSlug, aduType, sqft]);
  const feas = useMemo(
    () => assessFeasibility({ stateSlug, aduType, sqft, nearTransit, ownerOccupies }),
    [stateSlug, aduType, sqft, nearTransit, ownerOccupies]
  );
  const stateName = STATES.find((s) => s.slug === stateSlug)?.name ?? "your state";

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
          <span>Size</span>
          <span className="font-semibold text-slate-900">{sqft} sq ft</span>
        </label>
        <input
          id="adu-size"
          type="range" min={200} max={1200} step={50} value={sqft}
          aria-label="ADU size in square feet"
          onChange={(e) => setSqft(Number(e.target.value))}
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
          {formatUSD(cost.low)} <span className="text-slate-400">–</span> {formatUSD(cost.high)}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          ≈ {formatUSD(cost.perSqftLow)}–{formatUSD(cost.perSqftHigh)}/sq ft turnkey · midpoint {formatUSD(cost.mid)}
        </p>

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

        <p className="mt-3 text-xs text-slate-400">Rule basis: {feas.citation}</p>

        <a href="#report" className="mt-5 block rounded-xl bg-emerald-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-700">
          Get your detailed feasibility report →
        </a>
        <p className="mt-3 text-xs leading-relaxed text-slate-400">{site.disclaimer}</p>
      </div>
    </div>
  );
}
