"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { planLabel, type PlanId } from "@/lib/format";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-blue focus:ring-4 focus:ring-blue/10";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    const data = (await response.json()) as { message?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(data.message ?? "No pudimos enviar tu mensaje");
      return;
    }
    setStatus("ok");
    setMessage("Recibimos tu mensaje. Te escribiremos a la brevedad a tu correo.");
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[28px] border border-line bg-white p-6 sm:p-8">
      <label className="text-sm font-semibold text-ink">
        Nombre
        <input name="name" required className={fieldClass} placeholder="Ana Gómez" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Correo
        <input name="email" type="email" required className={fieldClass} placeholder="ana@tunegocio.com" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Teléfono
          <input name="phone" className={fieldClass} placeholder="300 000 0000" />
        </label>
        <label className="text-sm font-semibold text-ink">
          Empresa
          <input name="company" className={fieldClass} placeholder="Comercial Andina" />
        </label>
      </div>
      <label className="text-sm font-semibold text-ink">
        Mensaje
        <textarea name="message" required rows={5} className={fieldClass} placeholder="Cuéntanos qué necesitas habilitar ante la DIAN." />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-gradient-to-r from-blue to-blue-deep px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-rose-600" : "text-emerald-700"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function RegisterForm({ initialPlan }: { initialPlan: PlanId }) {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password !== confirm) {
      setStatus("error");
      setMessage("Las contraseñas no coinciden");
      return;
    }
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        company: form.get("company"),
        email: form.get("email"),
        phone: form.get("phone"),
        password,
        plan,
      }),
    });
    const data = (await response.json()) as { message?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(data.message ?? "No pudimos crear la cuenta");
      return;
    }
    router.push("/panel");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Plan de interés</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(["basico", "pro", "elite"] as PlanId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setPlan(id)}
              className={`rounded-2xl border px-3 py-2 text-sm font-semibold ${
                plan === id ? "border-blue bg-blue/10 text-blue-deep" : "border-line text-muted"
              }`}
            >
              {planLabel(id)}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Los 15 días de prueba aplican a cualquier plan. No pedimos tarjeta.</p>
      </fieldset>
      <label className="text-sm font-semibold text-ink">
        Nombre
        <input name="name" required className={fieldClass} placeholder="Tu nombre" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Empresa
        <input name="company" required className={fieldClass} placeholder="Nombre de tu negocio" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Correo
        <input name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="tu@correo.com" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Teléfono
        <input name="phone" className={fieldClass} placeholder="Opcional" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Contraseña
        <input name="password" type="password" required minLength={8} autoComplete="new-password" className={fieldClass} placeholder="Mínimo 8 caracteres" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Confirmar contraseña
        <input name="confirm" type="password" required minLength={8} autoComplete="new-password" className={fieldClass} />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 rounded-full bg-gradient-to-r from-blue to-blue-deep px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Creando cuenta..." : "Crear mi prueba gratis"}
      </button>
      {message ? (
        <p className="text-sm text-rose-600" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const data = (await response.json()) as { message?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(data.message ?? "No pudimos iniciar sesión");
      return;
    }
    router.push("/panel");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="text-sm font-semibold text-ink">
        Correo
        <input name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="tu@correo.com" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Contraseña
        <input name="password" type="password" required autoComplete="current-password" className={fieldClass} />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 rounded-full bg-gradient-to-r from-blue to-blue-deep px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Ingresando..." : "Entrar a mi espacio"}
      </button>
      {message ? (
        <p className="text-sm text-rose-600" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
