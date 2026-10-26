import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/forms";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Entra a tu espacio de Invoix.co.",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-navy px-12 py-12 text-white lg:flex lg:flex-col">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="relative">
          <Logo />
          <h1 className="mt-16 max-w-md font-display text-5xl font-semibold leading-[1.05] tracking-tight">
            Tu espacio te espera, con tu marca adelante.
          </h1>
          <p className="mt-6 max-w-md text-white/70">Entra para ver si tu plataforma ya está habilitada y cuáles son tus datos de acceso.</p>
        </div>
      </section>
      <section className="flex items-center bg-mist px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Logo tone="dark" />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-muted">Entra con el correo con el que enviaste la solicitud.</p>
          <div className="mt-6">
            <LoginForm />
          </div>
          <p className="mt-5 text-sm text-muted">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold text-blue">
              Comienza gratis
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
