import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "/#beneficios", label: "Características" },
      { href: "/#planes", label: "Precios" },
      { href: "/actualizaciones", label: "Actualizaciones" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { href: "/sobre-nosotros", label: "Sobre nosotros" },
      { href: "/contacto", label: "Contacto" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terminos", label: "Términos y condiciones" },
      { href: "/privacidad", label: "Políticas de privacidad" },
      { href: "/datos-personales", label: "Tratamiento de datos personales" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
            Facturación electrónica ilimitada para negocios en Colombia. Precio fijo, firma digital incluida y tu propio espacio de trabajo.
          </p>
          <a href="mailto:support@invoix.co" className="mt-4 inline-block text-sm font-semibold text-cyan">
            support@invoix.co
          </a>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-white">{column.title}</p>
              <ul className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/65 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-sm text-white/50 sm:px-8">
          © 2026 Invoix Inc. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
