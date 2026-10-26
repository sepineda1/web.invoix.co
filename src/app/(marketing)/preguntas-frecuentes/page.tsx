import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { getFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Firma digital, facturación ilimitada, ayuda con la DIAN y cancelación sin permanencia.",
};

export default async function PreguntasPage() {
  const faqs = await getFaqs();
  return (
    <>
      <PageHero
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        description="Si vas a habilitarte como facturador electrónico, estas son las respuestas que más importan."
      />
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}
