import { redirect } from "next/navigation";
import { PanelShell } from "@/components/panel-shell";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session?.sub) redirect("/iniciar-sesion");

  const user = await prisma.user.findUnique({ where: { id: session.sub } });
  if (!user) redirect("/iniciar-sesion");

  return (
    <PanelShell user={{ name: user.name, email: user.email, company: user.company, role: user.role }}>
      {children}
    </PanelShell>
  );
}
