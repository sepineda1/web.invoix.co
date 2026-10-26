import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { RegisterForm } from "@/components/forms";
import { PLAN_IDS, type PlanId } from "@/lib/format";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Prueba Invoix.co 15 días gratis. Sin tarjeta de crédito y con firma digital incluida.",
};

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const params = await searchParams;
  const initialPlan: PlanId = PLAN_IDS.includes(params.plan as PlanId) ? (params.plan as PlanId) : "pro";

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-navy px-12 py-12 text-white lg:flex lg:flex-col">
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-blue/30 blur-3xl" />
        <div className="relative">
          <Logo />
          <h1 className="mt-16 max-w-md font-display text-5xl font-semibold leading-[1.05] tracking-tight">
            Empieza hoy. La DIAN no tiene que ser el obstáculo.
          </h1>
          <ul className="mt-8 grid max-w-md gap-3 text-sm text-white/75">
            <li>15 días gratis, sin tarjeta.</li>
            <li>Firma digital incluida en todos los planes.</li>
            <li>Cancelas cuando quieras.</li>
          </ul>
        </div>
      </section>
      <section className="flex items-center bg-mist px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Logo tone="dark" />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Crea tu cuenta gratis</h1>
          <p className="mt-2 text-sm text-muted">Dejas la solicitud y, cuando habilitemos tu plataforma, aquí verás el acceso.</p>
          <div className="mt-6">
            <RegisterForm initialPlan={initialPlan} />
          </div>
          <p className="mt-5 text-sm text-muted">
            ¿Ya tienes cuenta?{" "}
            <Link href="/iniciar-sesion" className="font-semibold text-blue">
              Inicia sesión
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
