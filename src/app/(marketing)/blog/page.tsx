import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guías cortas sobre facturación electrónica, la DIAN y cómo ordenar las ventas de tu negocio.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas claras para facturar sin enredos."
        description="Textos prácticos para habilitarte, entender la firma digital y dejar de pagar por cada documento."
      />
      <section className="bg-mist py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col rounded-[28px] border border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">{post.category}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">{post.excerpt}</p>
              <p className="mt-5 text-xs font-medium text-muted">{formatDate(post.publishedAt)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
