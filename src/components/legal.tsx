import type { ReactNode } from "react";
import { PageHero } from "./page-hero";

export function Legal({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={intro} />
      <article className="prose-invoix bg-white py-16">
        <div className="mx-auto max-w-3xl px-5 text-base leading-8 text-muted sm:px-8">{children}</div>
      </article>
    </>
  );
}
