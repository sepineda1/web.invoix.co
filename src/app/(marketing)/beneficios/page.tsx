import type { Metadata } from "next";
import { Benefits } from "@/components/benefits";
import { Comparison } from "@/components/comparison";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Beneficios",
  description: "Facturación ilimitada, firma digital, POS, inventario y tu propio subdominio en Invoix.co.",
};

export default function BeneficiosPage() {
  return (
    <>
      <PageHero
        eyebrow="Beneficios"
        title="Una sola plataforma para facturar, vender y ordenar tu operación."
        description="Invoix.co reúne la facturación electrónica, el punto de venta y el inventario para que dejes de pagar recargos por crecer."
      />
      <Comparison />
      <Benefits />
    </>
  );
}
