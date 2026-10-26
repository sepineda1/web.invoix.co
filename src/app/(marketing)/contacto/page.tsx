import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/forms";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos a support@invoix.co o déjanos un mensaje. Te ayudamos con la habilitación DIAN.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu habilitación."
        description="Cuéntanos en qué vas con la DIAN. Respondemos desde support@invoix.co."
      />
      <section className="bg-mist py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[28px] bg-navy p-7 text-white">
            <Mail className="h-6 w-6 text-cyan" />
            <h2 className="mt-4 font-display text-3xl font-semibold">support@invoix.co</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Escríbenos para soporte, planes Élite con configuración llave en mano o dudas de facturación. El equipo responde en español.
            </p>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
