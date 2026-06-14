import type { MetadataRoute } from "next";
import { STATES, citySlug } from "@/lib/states";
import { ADU_TYPES } from "@/lib/cost";
import { POSTS } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/states`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  for (const t of ADU_TYPES) {
    urls.push({ url: `${site.url}/cost/${t.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const s of STATES) {
    urls.push({ url: `${site.url}/${s.slug}`, lastModified: now, changeFrequency: "monthly", priority: s.rules.statewideLaw ? 0.9 : 0.7 });
    for (const c of s.cities) {
      urls.push({ url: `${site.url}/${s.slug}/${citySlug(c)}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
    }
  }
  for (const p of POSTS) {
    urls.push({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.6 });
  }
  return urls;
}
