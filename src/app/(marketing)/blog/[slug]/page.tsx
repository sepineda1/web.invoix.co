import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { RichText } from "@/components/rich-text";
import { getPost } from "@/lib/content";
import { formatDate } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artículo" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} description={formatDate(post.publishedAt)} />
      <article className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <RichText content={post.content} />
        </div>
      </article>
    </>
  );
}
