import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Invoix.co es la plataforma de facturación electrónica con precio fijo para negocios en Colombia.",
};

const principles = [
  {
    title: "Precio fijo",
    body: "Tu crecimiento no debería traer una factura más cara. Por eso el plan PRO no cobra por documento adicional.",
  },
  {
    title: "Acompañamiento real",
    body: "La habilitación ante la DIAN tiene pasos concretos. Te guiamos en español y, en el plan Élite, la dejamos lista por ti.",
  },
  {
    title: "Tu marca adelante",
    body: "Cada negocio entra a su propio espacio, con un subdominio como tumarca.invoix.co, separado y seguro.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Compañía"
        title="Facturar bien no debería costar más cuando te va mejor."
        description="Invoix.co existe para que independientes, comercios y empresas en Colombia emitan factura electrónica sin cupos, sin recargos y con la firma digital incluida."
      />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-line bg-mist p-7">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-3xl px-5 text-base leading-8 text-muted sm:px-8">
          <p>
            Trabajamos con el ritmo de un negocio colombiano: caja, inventario, clientes y la DIAN en el mismo lugar. Si quieres hablar con una persona, escríbenos a{" "}
            <a className="font-semibold text-blue" href="mailto:support@invoix.co">
              support@invoix.co
            </a>
            .
          </p>
          <Link href="/registro" className="mt-6 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">
            Empieza la prueba de 15 días
          </Link>
        </div>
      </section>
    </>
  );
}
