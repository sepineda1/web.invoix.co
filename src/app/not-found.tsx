import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">Esta página no está en tu espacio.</h1>
      <Link href="/" className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy">
        Volver al inicio
      </Link>
    </div>
  );
}
