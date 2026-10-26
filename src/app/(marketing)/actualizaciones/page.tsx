import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getUpdates } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Actualizaciones",
  description: "Novedades del producto Invoix.co: facturación, POS, firma digital y tu espacio de trabajo.",
};

export default async function UpdatesPage() {
  const updates = await getUpdates();
  return (
    <>
      <PageHero
        eyebrow="Producto"
        title="Lo que vamos publicando."
        description="Cada nota resume una mejora real de la plataforma. Sin letra pequeña."
      />
      <section className="bg-mist py-16">
        <div className="mx-auto grid max-w-3xl gap-4 px-5 sm:px-8">
          {updates.map((update) => (
            <article key={update.id} className="rounded-[28px] border border-line bg-white p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">{update.tag}</span>
                <time className="text-xs text-muted">{formatDate(update.publishedAt)}</time>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{update.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">{update.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
