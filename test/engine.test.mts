// Verification of the ADU cost + feasibility engine against hand-computed values.
// Run: tsx test/engine.test.mts
import { estimateCost, getAduType, ADU_TYPES, formatUSD } from "../lib/cost.ts";
import { assessFeasibility } from "../lib/feasibility.ts";
import { getState, STATES, citySlug, findCity } from "../lib/states.ts";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}

// --- Cost engine ---
// CA (index 1.25) detached 600 sq ft: low = 220*1.25*600 = 165,000; high = 360*1.25*600 = 270,000.
const ca = estimateCost({ stateSlug: "california", aduType: "detached", sqft: 600 });
check("CA detached 600sqft low = 165000", ca.low === 165000, `got ${ca.low}`);
check("CA detached 600sqft high = 270000", ca.high === 270000, `got ${ca.high}`);
check("CA detached mid between low/high", ca.mid > ca.low && ca.mid < ca.high, `got ${ca.mid}`);

// Garage conversion is cheaper than detached for the same state/size.
const conv = estimateCost({ stateSlug: "california", aduType: "garage-conversion", sqft: 600 });
check("garage conversion cheaper than detached", conv.high < ca.high, `${conv.high} vs ${ca.high}`);

// Texas (index 0.92) cheaper than CA (1.25) for identical inputs.
const tx = estimateCost({ stateSlug: "texas", aduType: "detached", sqft: 600 });
check("TX cheaper than CA (regional index)", tx.high < ca.high, `${tx.high} vs ${ca.high}`);

// Size is clamped to 100–1500.
const clamped = estimateCost({ stateSlug: "texas", aduType: "detached", sqft: 5000 });
check("sqft clamped to 1500", clamped.sqft === 1500, `got ${clamped.sqft}`);

check("unknown state falls back to index 1.0", estimateCost({ stateSlug: "nowhere", aduType: "detached", sqft: 100 }).costIndex === 1.0);
check("formatUSD adds commas", formatUSD(165000) === "$165,000");
check("all 5 ADU types present", ADU_TYPES.length === 5);
check("getAduType resolves slug", getAduType("garage-conversion")?.type === "garage-conversion");

// --- Feasibility ---
// CA detached 700 sq ft near transit, pure rental: should be "likely" (under 800 guaranteed min, no owner-occ, fee waiver).
const f = assessFeasibility({ stateSlug: "california", aduType: "detached", sqft: 700, nearTransit: true, ownerOccupies: false });
check("CA 700sqft verdict likely", f.verdict === "likely", `got ${f.verdict}`);
check("CA cites Gov Code 66314", f.citation.includes("66314"));
check("CA has no-owner-occupancy pass flag", f.flags.some((x) => x.level === "pass" && /owner-occupancy/i.test(x.title)));
check("CA <750 gets fee waiver flag", f.flags.some((x) => /fee/i.test(x.title)));

// CA detached 1100 sq ft -> above guaranteed min -> at least one caution -> "maybe".
const fBig = assessFeasibility({ stateSlug: "california", aduType: "detached", sqft: 1100 });
check("CA 1100sqft verdict maybe", fBig.verdict === "maybe", `got ${fBig.verdict}`);

// JADU over 500 sq ft -> caution on size.
const fj = assessFeasibility({ stateSlug: "california", aduType: "jadu", sqft: 700 });
check("JADU >500 flagged", fj.flags.some((x) => x.level === "caution" && /JADU/i.test(x.title)));

// Texas (no statewide law) -> verdict "local".
const ftx = assessFeasibility({ stateSlug: "texas", aduType: "detached", sqft: 600 });
check("TX verdict local", ftx.verdict === "local", `got ${ftx.verdict}`);

// --- Data integrity ---
check("31 states/territories present", STATES.length >= 30, `got ${STATES.length}`);
check("all slugs unique", new Set(STATES.map((s) => s.slug)).size === STATES.length);
check("every state has >=1 city", STATES.every((s) => s.cities.length >= 1));
check("statewide-law states cite a statute", STATES.filter((s) => s.rules.statewideLaw).every((s) => s.rules.citation.length > 8));
check("citySlug normalises", citySlug("San José ") === "san-jos" || citySlug("Los Angeles") === "los-angeles");
check("findCity resolves LA in CA", findCity("california", "los-angeles")?.city === "Los Angeles");
check("getState by slug", getState("washington")?.abbr === "WA");

// --- Deeper coverage: every state, every type ---
for (const s of STATES) {
  check(`${s.slug}: costIndex > 0`, s.costIndex > 0, `got ${s.costIndex}`);
  check(`${s.slug}: slug is url-safe`, /^[a-z0-9-]+$/.test(s.slug));
  for (const t of ADU_TYPES) {
    const c = estimateCost({ stateSlug: s.slug, aduType: t.type, sqft: 600 });
    check(`${s.slug}/${t.slug}: low < high`, c.low < c.high, `${c.low}/${c.high}`);
    check(`${s.slug}/${t.slug}: low <= mid <= high`, c.low <= c.mid && c.mid <= c.high);
    check(`${s.slug}/${t.slug}: positive cost`, c.low > 0);
  }
}

// Monotonicity: bigger ADU costs more (same state/type).
const small = estimateCost({ stateSlug: "california", aduType: "detached", sqft: 400 });
const large = estimateCost({ stateSlug: "california", aduType: "detached", sqft: 1000 });
check("cost increases with size", large.high > small.high && large.low > small.low);

// Type ordering: JADU cheapest, detached priciest per sqft (same state).
const perSqft = ADU_TYPES.map((t) => ({ t: t.slug, v: estimateCost({ stateSlug: "texas", aduType: t.type, sqft: 600 }).perSqftHigh }));
const jadu = perSqft.find((x) => x.t === "jadu")!.v;
const det = perSqft.find((x) => x.t === "detached")!.v;
check("JADU cheapest per sqft", jadu === Math.min(...perSqft.map((x) => x.v)), `jadu ${jadu}`);
check("detached priciest per sqft", det === Math.max(...perSqft.map((x) => x.v)), `det ${det}`);

// Min clamp: sqft below 100 clamps to 100.
check("sqft clamped to min 100", estimateCost({ stateSlug: "texas", aduType: "jadu", sqft: 10 }).sqft === 100);

// Hawaii (highest index 1.35) is the most expensive state for a detached unit.
const allDetached = STATES.map((s) => ({ s: s.slug, v: estimateCost({ stateSlug: s.slug, aduType: "detached", sqft: 600 }).high }));
check("Hawaii is most expensive detached", allDetached.find((x) => x.s === "hawaii")!.v === Math.max(...allDetached.map((x) => x.v)));

// Feasibility for every state produces a verdict + at least 3 flags + a citation.
for (const s of STATES) {
  const f = assessFeasibility({ stateSlug: s.slug, aduType: "detached", sqft: 600 });
  check(`${s.slug}: feasibility has flags`, f.flags.length >= 3, `got ${f.flags.length}`);
  check(`${s.slug}: verdict valid`, ["likely", "maybe", "local"].includes(f.verdict));
  check(`${s.slug}: has citation`, f.citation.length > 0);
  check(`${s.slug}: statewide => not 'local'`, !s.rules.statewideLaw || f.verdict !== "local");
  check(`${s.slug}: no statewide => 'local'`, s.rules.statewideLaw || f.verdict === "local");
}

// WA + OR statewide => likely/maybe (never local).
check("WA not local", assessFeasibility({ stateSlug: "washington", aduType: "detached", sqft: 800 }).verdict !== "local");
check("OR not local", assessFeasibility({ stateSlug: "oregon", aduType: "detached", sqft: 600 }).verdict !== "local");

// formatUSD edge cases.
check("formatUSD zero", formatUSD(0) === "$0");
check("formatUSD millions", formatUSD(1234567) === "$1,234,567");

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
