import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, type Block } from "@/lib/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, url: `${site.url}/blog/${post.slug}`, type: "article" },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="mt-8 text-xl font-semibold text-slate-900">{block.text}</h2>;
    case "ul":
      return (
        <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-slate-700">
          {block.items.map((it, k) => <li key={k}>{it}</li>)}
        </ul>
      );
    case "cta":
      return (
        <Link key={i} href={block.href} className="my-6 block rounded-xl bg-emerald-50 px-5 py-4 text-center font-medium text-emerald-700 ring-1 ring-emerald-100 hover:bg-emerald-100">
          {block.text} →
        </Link>
      );
    default:
      return <p key={i} className="mt-4 leading-relaxed text-slate-700">{block.text}</p>;
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link> <span className="px-1">/</span>
        <Link href="/blog" className="hover:text-slate-900">Guides</Link> <span className="px-1">/</span>
        <span className="text-slate-700">{post.title}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{post.title}</h1>
      <p className="mt-2 text-sm text-slate-400">{post.readingMinutes} min read</p>
      <div className="mt-6">{post.blocks.map(renderBlock)}</div>
      <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-center text-white">
        <p className="font-semibold">Find out what your ADU will cost</p>
        <Link href="/" className="mt-3 inline-block rounded-xl bg-emerald-500 px-5 py-2.5 font-medium hover:bg-emerald-400">Open the calculator →</Link>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-slate-400">{site.disclaimer}</p>
    </article>
  );
}
