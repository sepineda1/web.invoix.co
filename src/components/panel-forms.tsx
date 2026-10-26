"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10";

export function CompanyForm({
  initial,
}: {
  initial: { tradeName: string; nit: string; city: string; address: string };
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/empresa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    const data = (await response.json()) as { message?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(data.message ?? "No pudimos guardar");
      return;
    }
    setStatus("ok");
    setMessage("Datos guardados. Los vamos a usar para habilitar tu plataforma.");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="text-sm font-semibold text-ink">
        Razón social
        <input name="tradeName" required defaultValue={initial.tradeName} className={fieldClass} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          NIT
          <input name="nit" required defaultValue={initial.nit} className={fieldClass} placeholder="900000000-1" />
        </label>
        <label className="text-sm font-semibold text-ink">
          Ciudad
          <input name="city" required defaultValue={initial.city} className={fieldClass} />
        </label>
      </div>
      <label className="text-sm font-semibold text-ink">
        Dirección
        <input name="address" defaultValue={initial.address} className={fieldClass} />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Guardando..." : "Guardar datos"}
      </button>
      {message ? <p className={`text-sm ${status === "error" ? "text-rose-600" : "text-emerald-700"}`}>{message}</p> : null}
    </form>
  );
}

