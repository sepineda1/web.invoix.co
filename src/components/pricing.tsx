"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { cop } from "@/lib/format";

export type PlanView = {
  id: string;
  name: string;
  audience: string;
  monthlyPrice: number;
  semiannualPrice: number;
  semiannualTotal: number;
  annualPrice: number;
  annualTotal: number;
  popular: boolean;
  features: string[];
  cta: string;
};

const cycles = [
  { id: "mensual", label: "Mensual" },
  { id: "semestral", label: "Semestral" },
  { id: "anual", label: "Anual" },
] as const;

type Cycle = (typeof cycles)[number]["id"];

export function Pricing({ plans }: { plans: PlanView[] }) {
  const [cycle, setCycle] = useState<Cycle>("semestral");

  const priced = useMemo(
    () =>
      plans.map((plan) => {
        const price =
          cycle === "mensual" ? plan.monthlyPrice : cycle === "semestral" ? plan.semiannualPrice : plan.annualPrice;
        const total = cycle === "semestral" ? plan.semiannualTotal : cycle === "anual" ? plan.annualTotal : plan.monthlyPrice;
        const saving = Math.round((1 - price / plan.monthlyPrice) * 100);
        const note =
          cycle === "mensual"
            ? "Facturado cada mes"
            : cycle === "semestral"
              ? `Facturado ${cop(total)} semestral`
              : `Facturado ${cop(total)} anual`;
        return { ...plan, price, note, saving };
      }),
    [plans, cycle],
  );

  return (
    <section id="planes" className="bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue">Planes y precios</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Planes transparentes que crecen con tu negocio.
          </h2>
          <p className="mt-4 text-lg text-muted">Sin contratos de permanencia. Sin letras pequeñas.</p>
          <div className="mx-auto mt-8 inline-flex rounded-full border border-line bg-white p-1 shadow-sm" role="tablist" aria-label="Periodo de pago">
            {cycles.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={cycle === item.id}
                onClick={() => setCycle(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 ${
                  cycle === item.id ? "bg-navy text-white" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
                {item.id === "semestral" ? <span className="ml-1 text-cyan">· 20%</span> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {priced.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-[28px] p-7 ${
                plan.popular
                  ? "bg-navy text-white shadow-[0_30px_70px_-32px_rgba(27,127,232,0.85)] lg:-mt-4 lg:mb-[-1rem]"
                  : "border border-line bg-white text-ink"
              }`}
            >
              {plan.popular ? (
                <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-cyan to-blue px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
                  Más popular
                </span>
              ) : null}
              <p className={`text-sm font-semibold ${plan.popular ? "text-cyan" : "text-blue"}`}>{plan.name}</p>
              <p className={`mt-2 text-sm leading-6 ${plan.popular ? "text-white/70" : "text-muted"}`}>{plan.audience}</p>
              <div className="mt-6 flex items-end gap-2">
                <p className="font-display text-4xl font-semibold tracking-tight">{cop(plan.price)}</p>
                <p className={`mb-1 text-sm ${plan.popular ? "text-white/60" : "text-muted"}`}>/ mes</p>
              </div>
              <p className={`mt-2 text-sm ${plan.popular ? "text-white/70" : "text-muted"}`}>
                {plan.note}
                {plan.saving > 0 ? ` · Ahorras ${plan.saving}%` : ""}
              </p>
              <ul className="mt-6 grid flex-1 gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.popular ? "text-cyan" : "text-blue"}`} />
                    <span className={/ilimitad|todo lo del plan/i.test(feature) ? "font-semibold" : ""}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/registro?plan=${plan.id}`}
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-white text-navy hover:bg-sky"
                    : "bg-navy text-white hover:bg-navy-soft"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
