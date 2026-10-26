"use client";

import { useState } from "react";
import { platformUrl } from "@/lib/format";

export function AccessCard({
  subdomain,
  username,
  password,
}: {
  subdomain: string;
  username: string;
  password: string;
}) {
  const url = platformUrl(subdomain);
  const [copied, setCopied] = useState("");

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
  }

  const rows = [
    ["Plataforma", url],
    ["Usuario", username],
    ["Contraseña", password],
  ];

  return (
    <div className="rounded-[28px] bg-gradient-to-br from-navy to-[#1563c4] p-6 text-white">
      <p className="text-sm font-semibold text-cyan">Tu plataforma ya está habilitada</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Entra con estos datos</h2>
      <p className="mt-2 text-sm text-white/70">La facturación se hace en tu plataforma, no en esta página.</p>
      <dl className="mt-6 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white/10 px-4 py-3">
            <dt className="text-xs uppercase tracking-[0.14em] text-white/60">{label}</dt>
            <dd className="mt-1 flex items-center justify-between gap-3">
              {label === "Plataforma" ? (
                <a href={value} className="truncate font-semibold text-white underline decoration-white/40" target="_blank" rel="noreferrer">
                  {value.replace("https://", "")}
                </a>
              ) : (
                <span className="truncate font-semibold">{value}</span>
              )}
              <button type="button" onClick={() => copy(label, value)} className="shrink-0 text-xs font-semibold text-cyan">
                {copied === label ? "Copiado" : "Copiar"}
              </button>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
