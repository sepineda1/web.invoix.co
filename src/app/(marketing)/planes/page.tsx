import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Pricing } from "@/components/pricing";
import { getPlans } from "@/lib/content";

export const metadata: Metadata = {
  title: "Planes y precios",
  description: "Planes Básico, PRO y Élite. Sin permanencia y con ahorro en el pago semestral y anual.",
};

export default async function PlanesPage() {
  const plans = await getPlans();
  return (
    <>
      <PageHero
        eyebrow="Precios"
        title="Elige el ritmo de tu negocio. El precio no cambia cuando vendes más."
        description="En el plan PRO la facturación electrónica es ilimitada. Pagas un valor fijo, factures 100 o 10.000 veces."
      />
      <Pricing plans={plans} />
    </>
  );
}
