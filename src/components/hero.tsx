import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import { ProductStage } from "./product-stage";

const industries = ["Restaurantes", "Droguerías", "Ferreterías", "Consultorios", "Tiendas", "Talleres", "Contadores"];

const stats = [
  { value: "5.000+", label: "Empresas en Colombia" },
  { value: "15 días", label: "De prueba gratis" },
  { value: "$0", label: "Por factura extra en PRO" },
  { value: "24/7", label: "Tu espacio siempre activo" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-blue/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-cyan/20 blur-3xl" />
        <div className="grid-fade absolute inset-0" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-36">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-sm font-medium text-sky">
            <ShieldCheck className="h-4 w-4 text-cyan" />
            Software 100% avalado por la DIAN
          </p>
          <h1 className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.15rem]">
            Facturación electrónica{" "}
            <span className="bg-gradient-to-r from-sky via-cyan to-blue bg-clip-text text-transparent">sin límites</span>{" "}
            ni complicaciones.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">
            La solución más rápida, segura y económica para tu negocio en Colombia. Olvídate de pagar por cada factura que emites. Cumple con la DIAN en minutos y concéntrate en hacer crecer tus ventas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/registro"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-blue-deep px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(62,198,245,0.95)] transition hover:brightness-110"
            >
              Prueba 15 días gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#planes"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver planes
            </Link>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-cyan" /> No requiere tarjeta de crédito
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-cyan" /> Firma digital incluida
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-cyan" /> Cancelas cuando quieras
            </span>
          </p>
        </div>
        <ProductStage />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <p className="text-center text-sm font-medium text-white/55">Más de 5.000 empresas colombianas ya confían en nosotros.</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {industries.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/75">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <dl className="grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-navy/40 px-6 py-6 backdrop-blur">
              <dt className="font-display text-3xl font-semibold text-white">{stat.value}</dt>
              <dd className="mt-1 text-sm text-white/60">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
