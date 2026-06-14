// Content + data-integrity tests: blog posts and the programmatic URL surface.
// Run: tsx test/content.test.mts
import { POSTS, getPost, type Block } from "../lib/posts.ts";
import { STATES, citySlug, findCity } from "../lib/states.ts";
import { ADU_TYPES } from "../lib/cost.ts";

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

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
