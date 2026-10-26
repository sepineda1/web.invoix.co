import { Benefits } from "@/components/benefits";
import { ClosingCta } from "@/components/closing-cta";
import { Comparison } from "@/components/comparison";
import { DeviceShowcase } from "@/components/devices";
import { FaqList } from "@/components/faq-list";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { getFaqs, getPlans, getTestimonials } from "@/lib/content";

export default async function HomePage() {
  const [plans, testimonials, faqs] = await Promise.all([getPlans(), getTestimonials(), getFaqs()]);

  return (
    <>
      <Hero />
      <Comparison />
      <Benefits />
      <DeviceShowcase />
      <Pricing plans={plans} />
      <Testimonials items={testimonials} />
      <section id="preguntas" className="bg-mist py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue">Preguntas frecuentes</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Resolvemos lo que más nos preguntan antes de empezar.
            </h2>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
