import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { HabilitacionForm } from "@/components/habilitacion-form";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { formatDate, planLabel } from "@/lib/format";

export default async function SolicitudPage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) redirect("/panel");

  const { id } = await params;
  const client = await prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });
  if (!client || client.role === "admin") notFound();

  return (
    <div className="p-5 sm:p-8">
      <Link href="/panel" className="text-sm font-semibold text-blue">
        Volver a solicitudes
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue">Solicitud</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">{client.company}</h1>
          <p className="mt-2 text-sm text-muted">
            {client.name} · {client.email} · Plan {planLabel(client.planInterest)} · {formatDate(client.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[28px] border border-line p-6">
          <h2 className="font-display text-xl font-semibold">Lo que dejó el cliente</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <Row label="Teléfono" value={client.phone || "No lo registró"} />
            <Row label="Razón social" value={client.profile?.tradeName || client.company} />
            <Row label="NIT" value={client.profile?.nit || "Pendiente"} />
            <Row label="Ciudad" value={client.profile?.city || "Pendiente"} />
            <Row label="Dirección" value={client.profile?.address || "Pendiente"} />
          </dl>
        </section>
        <section className="rounded-[28px] border border-line p-6">
          <h2 className="font-display text-xl font-semibold">Habilitar plataforma</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Si la empresa se llama Intesa, el enlace queda intesa.invoix.co. El usuario y la contraseña son los del software de facturación, y el cliente los verá al iniciar sesión aquí.
          </p>
          <div className="mt-5">
            <HabilitacionForm
              userId={client.id}
              initial={{
                status: client.status,
                subdomain: client.subdomain,
                platformUser: client.platformUser,
                platformPassword: client.platformPassword,
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line pb-2">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-semibold text-ink">{value}</dd>
    </div>
  );
}
