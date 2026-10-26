"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqView = { id: string; question: string; answer: string };

export function FaqList({ faqs }: { faqs: FaqView[] }) {
  const [open, setOpen] = useState(faqs[0]?.id ?? "");

  return (
    <div className="grid gap-3">
      {faqs.map((faq) => {
        const expanded = open === faq.id;
        return (
          <article key={faq.id} className="overflow-hidden rounded-3xl border border-line bg-white">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? "" : faq.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="font-display text-lg font-semibold tracking-tight text-ink">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-blue transition ${expanded ? "rotate-180" : ""}`} />
              </button>
            </h3>
            {expanded ? <p className="px-5 pb-5 text-sm leading-7 text-muted sm:px-6">{faq.answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
