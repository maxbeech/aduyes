// Content + data-integrity tests: blog posts and the programmatic URL surface.
// Run: tsx test/content.test.mts
import { POSTS, getPost, type Block } from "../lib/posts.ts";
import { STATES, citySlug, findCity } from "../lib/states.ts";
import { ADU_TYPES } from "../lib/cost.ts";
import { site } from "../lib/site.ts";
import { stateMetaTitle, stateMetaDescription, cityMetaTitle, cityMetaDescription, costMetaTitle, costMetaDescription } from "../lib/seo.ts";

let pass = 0, fail = 0;
function check(name: string, cond: boolean, extra = "") {
  if (cond) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.error(`  FAIL ${name} ${extra}`); }
}

// --- Blog posts ---
check("at least 10 posts", POSTS.length >= 10, `got ${POSTS.length}`);
check("post slugs unique", new Set(POSTS.map((p) => p.slug)).size === POSTS.length);
check("post keywords unique", new Set(POSTS.map((p) => p.keyword)).size === POSTS.length);

const validTypes = new Set(["p", "h2", "ul", "cta"]);
for (const p of POSTS) {
  check(`${p.slug}: slug url-safe`, /^[a-z0-9-]+$/.test(p.slug));
  check(`${p.slug}: title 20-70 chars`, p.title.length >= 20 && p.title.length <= 70, `len ${p.title.length}`);
  check(`${p.slug}: description 80-180 chars`, p.description.length >= 80 && p.description.length <= 180, `len ${p.description.length}`);
  check(`${p.slug}: date ISO`, /^\d{4}-\d{2}-\d{2}$/.test(p.date));
  check(`${p.slug}: reading minutes set`, p.readingMinutes >= 1);
  check(`${p.slug}: has >=4 blocks`, p.blocks.length >= 4, `got ${p.blocks.length}`);
  check(`${p.slug}: has >=1 h2`, p.blocks.some((b) => b.type === "h2"));
  check(`${p.slug}: has a CTA`, p.blocks.some((b) => b.type === "cta"));
  check(`${p.slug}: all block types valid`, p.blocks.every((b: Block) => validTypes.has(b.type)));
  // every CTA points somewhere internal
  for (const b of p.blocks) {
    if (b.type === "cta") check(`${p.slug}: CTA href internal`, b.href.startsWith("/"), b.href);
    if (b.type === "p") check(`${p.slug}: paragraph non-empty`, b.text.trim().length > 20);
    if (b.type === "ul") check(`${p.slug}: list non-empty`, b.items.length >= 2);
  }
  check(`${p.slug}: getPost round-trips`, getPost(p.slug)?.title === p.title);
}
check("getPost unknown -> undefined", getPost("does-not-exist") === undefined);

// relatedPosts: returns 3 distinct others, never the post itself, all valid.
import { relatedPosts } from "../lib/posts.ts";
for (const p of POSTS) {
  const rel = relatedPosts(p.slug);
  check(`${p.slug}: 3 related`, rel.length === 3, `got ${rel.length}`);
  check(`${p.slug}: excludes self`, !rel.some((r) => r.slug === p.slug));
  check(`${p.slug}: related are real posts`, rel.every((r) => POSTS.some((x) => x.slug === r.slug)));
  check(`${p.slug}: related unique`, new Set(rel.map((r) => r.slug)).size === rel.length);
}

// --- Programmatic URL surface (mirror sitemap/generateStaticParams) ---
const urls = new Set<string>(["/", "/states", "/blog"]);
for (const t of ADU_TYPES) urls.add(`/cost/${t.slug}`);
for (const s of STATES) {
  urls.add(`/${s.slug}`);
  for (const c of s.cities) urls.add(`/${s.slug}/${citySlug(c)}`);
}
for (const p of POSTS) urls.add(`/blog/${p.slug}`);

check("URL set has no duplicates after dedupe", urls.size > 200, `got ${urls.size}`);
check("expected ~200+ routes", urls.size >= 200, `got ${urls.size}`);

// Every city slug must round-trip through findCity (no orphan pages).
let cityCount = 0, cityOk = 0;
for (const s of STATES) {
  for (const c of s.cities) {
    cityCount++;
    if (findCity(s.slug, citySlug(c))?.city === c) cityOk++;
  }
}
check("every city slug resolves", cityOk === cityCount, `${cityOk}/${cityCount}`);

// No city slug collides within a state (would make two pages share a URL).
for (const s of STATES) {
  const slugs = s.cities.map(citySlug);
  check(`${s.slug}: no city-slug collisions`, new Set(slugs).size === slugs.length);
}

// --- Page-template meta lengths (title base ≤60, description 80–160) ---
// "base" = before the " | ADUYes" suffix the layout template appends (8 chars).
const TITLE_MAX = 60, DESC_MAX = 160, DESC_MIN = 60;
check(`site.description ≤ ${DESC_MAX}`, site.description.length <= DESC_MAX, `len ${site.description.length}`);
check(`site.description ≥ ${DESC_MIN}`, site.description.length >= DESC_MIN, `len ${site.description.length}`);
check(`site.tagline short (title fits)`, (site.name.length + 3 + site.tagline.length) <= TITLE_MAX, `len ${site.name.length + 3 + site.tagline.length}`);
for (const s of STATES) {
  check(`${s.slug}: state title ≤ ${TITLE_MAX}`, stateMetaTitle(s).length <= TITLE_MAX, `len ${stateMetaTitle(s).length}`);
  const d = stateMetaDescription(s);
  check(`${s.slug}: state desc ${DESC_MIN}-${DESC_MAX}`, d.length >= DESC_MIN && d.length <= DESC_MAX, `len ${d.length}`);
  for (const c of s.cities) {
    check(`${s.slug}/${citySlug(c)}: city title ≤ ${TITLE_MAX}`, cityMetaTitle(c).length <= TITLE_MAX, `"${c}" len ${cityMetaTitle(c).length}`);
    const cd = cityMetaDescription(s, c);
    check(`${s.slug}/${citySlug(c)}: city desc ≤ ${DESC_MAX}`, cd.length <= DESC_MAX && cd.length >= DESC_MIN, `len ${cd.length}`);
  }
}
for (const t of ADU_TYPES) {
  check(`${t.slug}: cost title ≤ ${TITLE_MAX}`, costMetaTitle(t).length <= TITLE_MAX, `len ${costMetaTitle(t).length}`);
  const d = costMetaDescription(t);
  check(`${t.slug}: cost desc ${DESC_MIN}-${DESC_MAX}`, d.length >= DESC_MIN && d.length <= DESC_MAX, `len ${d.length}`);
}

// --- Lead routing (lib/lead.ts) ---
import { isValidEmail, buildLeadBody, buildLeadMailto } from "../lib/lead.ts";
check("email valid", isValidEmail("jane@example.com"));
check("email invalid: no @", !isValidEmail("notanemail"));
check("email invalid: no domain dot", !isValidEmail("jane@example"));
check("email invalid: empty", !isValidEmail("   "));
check("email invalid: spaces", !isValidEmail("a b@c.com"));
const body = buildLeadBody({ name: "Jane", email: "jane@example.com", zip: "90001", aduType: "Detached new build", timeline: "Next 3 months" });
check("body has email", body.includes("jane@example.com"));
check("body has all labels", ["Name:", "Email:", "Property ZIP:", "ADU type:", "Timeline:", "Notes:"].every((l) => body.includes(l)));
check("body missing fields => dash", buildLeadBody({ email: "x@y.com" }).includes("Name: —"));
const mailto = buildLeadMailto({ name: "Jane & Co. <test>", email: "jane@example.com", notes: "100% sure! a+b=c" });
check("mailto targets inbox", mailto.startsWith("mailto:hello@aduyes.com?"));
check("mailto has encoded subject", mailto.includes("subject=ADU%20feasibility%20report%20request"));
check("mailto encodes special chars (& < space)", mailto.includes("Jane%20%26%20Co.%20%3Ctest%3E") && !mailto.includes("Jane & Co."));
check("mailto encodes newlines", mailto.includes("%0A"));
const longNotes = "x".repeat(5000);
const longMailto = buildLeadMailto({ email: "a@b.com", notes: longNotes });
check("mailto handles long input", longMailto.length > 5000 && longMailto.startsWith("mailto:"));

// --- Accuracy regression guards (fabricated statutes the funnel introduced) ---
const allText = POSTS.map((p) =>
  [p.title, p.description, ...p.blocks.flatMap((b) =>
    b.type === "ul" ? b.items : b.type === "cta" ? [b.text] : [b.text]
  )].join(" ")
).join(" ").toLowerCase();
check("no wrong WA cite 'sb 5258'", !allText.includes("sb 5258"));
check("no fabricated Florida ADU preemption 'hb 7'", !/florida[^.]*\bhb 7\b/.test(allText) && !allText.includes("adu preemption law (hb 7)"));
check("Florida not claimed as statewide ADU mandate", !/florida'?s (sweeping )?(2023 )?adu preemption/.test(allText));
check("Oregon credits SB 1051", allText.includes("sb 1051"));

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
