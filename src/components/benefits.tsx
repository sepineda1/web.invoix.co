import { Building2, Infinity, MessageCircle, Package, PenLine, ShoppingCart, type LucideIcon } from "lucide-react";

const benefits: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Facturación DIAN ilimitada",
    body: "Emite todas las facturas de venta, notas crédito y débito que necesites sin pagar un peso de más. Disponible desde el plan PRO.",
    icon: Infinity,
  },
  {
    title: "Firma digital gratuita",
    body: "No pagues certificados costosos a terceros. Te incluimos la firma digital requerida por la DIAN para que arranques hoy mismo.",
    icon: PenLine,
  },
  {
    title: "Tu propio espacio",
    body: "Tu negocio merece verse profesional. Entra a tu plataforma con un subdominio personalizado, tumarca.invoix.co, en un servidor seguro y aislado.",
    icon: Building2,
  },
  {
    title: "Punto de venta integrado",
    body: "Controla tus ventas de mostrador de forma rápida. Compatible con lectores de códigos de barras y cajones monederos.",
    icon: ShoppingCart,
  },
  {
    title: "Inventario y clientes al instante",
    body: "Crea tus productos, gestiona tu stock en tiempo real y mantén una base organizada de todos tus clientes.",
    icon: Package,
  },
  {
    title: "Soporte VIP por WhatsApp",
    body: "No hables con robots. Te acompañamos en la habilitación ante la DIAN y te ayudamos a configurar todo, paso a paso.",
    icon: MessageCircle,
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue">Beneficios</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Todo lo que tu negocio necesita en una sola plataforma.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-[28px] border border-line bg-mist/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue/30 hover:bg-white hover:shadow-[0_24px_50px_-32px_rgba(27,127,232,0.7)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan to-blue text-white shadow-[0_12px_24px_-14px_rgba(27,127,232,0.9)]">
                <benefit.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{benefit.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
