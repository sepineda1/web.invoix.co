"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-blue focus:ring-4 focus:ring-blue/10";

export function HabilitacionForm({
  userId,
  initial,
}: {
  userId: string;
  initial: {
    status: string;
    subdomain: string;
    platformUser: string;
    platformPassword: string;
  };
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initial.status === "habilitado" ? "habilitado" : "pendiente");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/habilitacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        status,
        subdomain: form.get("subdomain"),
        platformUser: form.get("platformUser"),
        platformPassword: form.get("platformPassword"),
      }),
    });
    const data = (await response.json()) as { message?: string };
    if (!response.ok) {
      setState("error");
      setMessage(data.message ?? "No pudimos guardar la habilitación");
      return;
    }
    setState("ok");
    setMessage(status === "habilitado" ? "Plataforma habilitada. El cliente ya puede ver su acceso." : "La solicitud quedó en proceso.");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Estado</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            ["pendiente", "En proceso"],
            ["habilitado", "Habilitado"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setStatus(id)}
              className={`rounded-2xl border px-3 py-3 text-sm font-semibold ${
                status === id ? "border-blue bg-blue/10 text-blue-deep" : "border-line text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="text-sm font-semibold text-ink">
        Subdominio
        <span className="mt-2 flex overflow-hidden rounded-2xl border border-line focus-within:border-blue focus-within:ring-4 focus-within:ring-blue/10">
          <input
            name="subdomain"
            defaultValue={initial.subdomain}
            placeholder="intesa"
            className="min-w-0 flex-1 bg-white px-4 py-3 text-sm outline-none"
          />
          <span className="flex items-center bg-mist px-3 text-sm font-semibold text-muted">.invoix.co</span>
        </span>
      </label>
      <label className="text-sm font-semibold text-ink">
        Usuario de la plataforma
        <input name="platformUser" defaultValue={initial.platformUser} className={fieldClass} placeholder="usuario de acceso" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Contraseña de la plataforma
        <input
          name="platformPassword"
          defaultValue={initial.platformPassword}
          className={fieldClass}
          placeholder="La verá el cliente cuando esté habilitado"
        />
      </label>
      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {state === "loading" ? "Guardando..." : "Guardar habilitación"}
      </button>
      {message ? <p className={`text-sm ${state === "error" ? "text-rose-600" : "text-emerald-700"}`}>{message}</p> : null}
    </form>
  );
}
