import { Check, X } from "lucide-react";

const others = [
  "Límites de facturas al mes",
  "Cobros extra por cada documento",
  "Soporte lento y genérico",
  "Configuración confusa",
];

const ours = [
  "Facturación ilimitada desde el plan PRO",
  "Precio fijo, sin sorpresas a fin de mes",
  "Firma digital gratuita incluida",
  "Tu propio espacio: tuempresa.invoix.co",
];

export function Comparison() {
  return (
    <section className="bg-mist py-20 lg:py-28" id="comparacion">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue">El gancho</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            ¿Cansado de que te cobren por facturar o de quedarte sin saldo a fin de mes?
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            La mayoría de plataformas te limitan a 20 o 30 facturas al mes y te cobran recargos ocultos por cada documento adicional. En Invoix.co creemos que el éxito de tu negocio no debe ser penalizado.
          </p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] border border-line bg-white p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Otras plataformas</p>
            <ul className="mt-6 grid gap-4">
              {others.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <X className="h-4 w-4" />
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[28px] bg-gradient-to-br from-navy via-navy-soft to-[#164e9a] p-7 text-white shadow-[0_30px_70px_-36px_rgba(13,94,196,0.9)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan">Invoix.co</p>
            <ul className="mt-6 grid gap-4">
              {ours.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-cyan">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
