import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ClosingCta() {
  return (
    <section className="bg-mist px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-navy via-[#0c2a66] to-[#1563c4] px-6 py-16 text-white sm:px-12 lg:px-16">
        <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-cyan/30 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            ¿Listo para llevar la facturación de tu negocio al siguiente nivel?
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/75">
            Únete a los emprendedores que ya automatizaron sus ventas y cumplen con la DIAN sin dolores de cabeza.
          </p>
          <Link
            href="/registro"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:bg-sky"
          >
            Crea tu cuenta gratis ahora
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
