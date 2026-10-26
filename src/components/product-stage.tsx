import type { ReactNode } from "react";
import { BadgeCheck, ShieldCheck } from "lucide-react";

export function InvoiceCard() {
  return (
    <div className="rounded-[28px] bg-white p-5 text-ink shadow-[0_30px_80px_-28px_rgba(0,0,0,0.55)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue">Factura electrónica</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-tight">FV-10428</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <BadgeCheck className="h-3.5 w-3.5" />
          Aceptada DIAN
        </span>
      </div>
      <div className="mt-5 rounded-2xl bg-mist px-4 py-3">
        <p className="text-xs text-muted">Cliente</p>
        <p className="font-semibold">Comercial Andina S.A.S.</p>
        <p className="text-sm text-muted">NIT 900.482.110-4 · Bogotá</p>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-sm text-muted">Total con IVA</span>
        <span className="font-display text-2xl font-semibold text-blue-deep">$960.000</span>
      </div>
      <div className="mt-4 grid gap-3 text-sm">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <span>Arroz premium x 24</span>
          <span className="font-semibold">$612.000</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Aceite vegetal x 12</span>
          <span className="font-semibold">$348.000</span>
        </div>
      </div>
    </div>
  );
}

export function PhoneFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-[250px]">
      <div className="rounded-[2.1rem] border-[7px] border-[#091226] bg-[#091226] shadow-[0_25px_60px_-20px_rgba(7,20,51,0.65)]">
        <div className="overflow-hidden rounded-[1.55rem] bg-navy">
          <div className="flex items-center justify-between px-4 pt-3 text-[10px] text-white/70">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-black/50" />
            <span>5G</span>
          </div>
          <p className="px-4 pt-3 font-display text-lg font-semibold text-white">{title}</p>
          <div className="px-4 pb-4 pt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ProductStage() {
  return (
    <div className="relative">
      <div className="relative hidden h-[640px] lg:block">
        <div className="absolute inset-x-10 bottom-8 h-24 rounded-full bg-cyan/30 blur-3xl" />
        <div className="absolute right-0 top-8 h-[440px] w-[74%] rounded-[32px] bg-gradient-to-br from-[#3aa0f0] via-[#1b74e4] to-[#0b4eae] p-6 text-right shadow-[0_40px_80px_-36px_rgba(14,94,196,0.85)]">
          <p className="text-sm font-semibold text-white/85">tuempresa.invoix.co</p>
          <p className="ml-auto mt-3 max-w-[210px] font-display text-[2rem] font-semibold leading-[1.05] tracking-tight text-white">
            Precio fijo. Tu marca adelante.
          </p>
          <div className="ml-auto mt-6 flex h-24 w-40 items-end justify-end gap-1.5">
            {[46, 68, 52, 84, 73, 96].map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="w-4 rounded-t-lg bg-white/85"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="absolute left-0 top-28 w-[76%]">
          <InvoiceCard />
        </div>

        <div className="float-slow absolute left-2 top-6 z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-blue text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-xs text-muted">Estado DIAN</span>
            <span className="block text-sm font-semibold text-ink">Validada en segundos</span>
          </span>
        </div>

        <div className="float-delay absolute bottom-6 right-6 z-10 w-[230px]">
          <PhoneFrame title="Cobro en caja">
            <div className="rounded-2xl bg-white/8 p-3 text-white ring-1 ring-white/10">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Café molido</span>
                <span>$28.000</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-white/60">
                <span>Pan tajado</span>
                <span>$9.500</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-xs text-white/70">Total</span>
                <span className="font-display text-lg font-semibold">$37.500</span>
              </div>
              <div className="mt-3 rounded-full bg-gradient-to-r from-cyan to-blue py-2 text-center text-xs font-semibold">
                Facturar
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
          <ShieldCheck className="h-5 w-5 text-cyan" />
          <p className="text-sm font-semibold text-white">Factura validada por la DIAN en segundos</p>
        </div>
        <InvoiceCard />
      </div>
    </div>
  );
}
