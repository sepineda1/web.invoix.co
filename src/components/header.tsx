"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const links = [
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#planes", label: "Planes y precios" },
  { href: "/#preguntas", label: "Preguntas frecuentes" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/iniciar-sesion"
            className="rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition hover:text-white"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="rounded-full bg-gradient-to-r from-blue to-blue-deep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(62,198,245,0.9)] transition hover:brightness-110"
          >
            Comienza gratis
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-navy px-5 py-5 lg:hidden">
          <nav className="grid gap-1" aria-label="Móvil">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-3">
            <Link
              href="/iniciar-sesion"
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/registro"
              onClick={() => setOpen(false)}
              className="rounded-full bg-gradient-to-r from-blue to-blue-deep px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Comienza gratis
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
