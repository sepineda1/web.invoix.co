"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { LayoutDashboard, LifeBuoy, LogOut } from "lucide-react";
import { Logo } from "./logo";

export function PanelShell({
  user,
  children,
}: {
  user: { name: string; email: string; company: string; role: string };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user.role === "admin";
  const items = [
    {
      href: "/panel",
      label: isAdmin ? "Solicitudes" : "Mi solicitud",
      icon: LayoutDashboard,
      active: isAdmin ? pathname === "/panel" || pathname.startsWith("/panel/solicitudes") : pathname === "/panel",
    },
    { href: "/contacto", label: "Soporte", icon: LifeBuoy, active: pathname.startsWith("/contacto") },
  ];

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#e7eef8] px-3 py-3 sm:px-5 sm:py-5">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1440px] overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_30px_80px_-40px_rgba(7,20,51,0.45)] lg:grid-cols-[270px_1fr]">
        <aside className="flex flex-col border-b border-line bg-[#f7faff] p-5 lg:border-b-0 lg:border-r">
          <Logo tone="dark" compact />
          <p className="mt-6 truncate text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {isAdmin ? "Administración" : user.company}
          </p>
          <nav className="mt-4 grid gap-1" aria-label="Panel">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold ${
                    item.active ? "bg-blue text-white shadow-[0_12px_24px_-16px_rgba(27,127,232,0.9)]" : "text-ink/80 hover:bg-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-line">
              <p className="text-sm font-semibold text-ink">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
              <button type="button" onClick={logout} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue">
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
