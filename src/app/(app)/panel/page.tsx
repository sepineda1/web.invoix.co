import Link from "next/link";
import { redirect } from "next/navigation";
import { AccessCard } from "@/components/access-card";
import { CompanyForm } from "@/components/panel-forms";
import { prisma } from "@/lib/prisma";
import { formatDate, planLabel } from "@/lib/format";
import { getSession } from "@/lib/session";

export default async function PanelPage() {
  const session = await getSession();
  if (!session?.sub) redirect("/iniciar-sesion");

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    include: { profile: true },
  });
  if (!user) redirect("/iniciar-sesion");

  if (user.role === "admin") {
    const [clients, messages] = await Promise.all([
      prisma.user.findMany({
        where: { role: "client" },
        orderBy: { createdAt: "desc" },
        include: { profile: true },
      }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    ]);
    const pending = clients.filter((client) => client.status !== "habilitado").length;

    return (
      <div className="p-5 sm:p-8">
        <p className="text-sm font-semibold text-blue">Administración</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Solicitudes de clientes</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Aquí ves quién pidió una plataforma. Cuando la dejes lista en tu software, habilitas la cuenta y el cliente verá su subdominio, usuario y contraseña.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Metric label="Solicitudes" value={String(clients.length)} />
          <Metric label="En proceso" value={String(pending)} />
          <Metric label="Habilitadas" value={String(clients.length - pending)} />
        </div>
        <div className="mt-6 grid gap-3">
          {clients.length === 0 ? (
            <p className="rounded-3xl border border-line bg-mist px-5 py-10 text-center text-sm text-muted">Todavía no hay solicitudes.</p>
          ) : (
            clients.map((client) => (
              <Link
                key={client.id}
                href={`/panel/solicitudes/${client.id}`}
                className="rounded-[24px] border border-line bg-white px-5 py-4 transition hover:border-blue/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-xl font-semibold text-ink">{client.company}</p>
                    <p className="mt-1 text-sm text-muted">
                      {client.name} · {client.email}
                      {client.phone ? ` · ${client.phone}` : ""}
                    </p>
                  </div>
                  <StatusBadge status={client.status} />
                </div>
                <p className="mt-3 text-sm text-muted">
                  Plan {planLabel(client.planInterest)} · {formatDate(client.createdAt)}
                  {client.subdomain ? ` · ${client.subdomain}.invoix.co` : ""}
                </p>
              </Link>
            ))
          )}
        </div>

        <h2 className="mt-12 font-display text-2xl font-semibold text-ink">Mensajes de contacto</h2>
        <div className="mt-4 grid gap-3">
          {messages.length === 0 ? (
            <p className="text-sm text-muted">No hay mensajes.</p>
          ) : (
            messages.map((message) => (
              <article key={message.id} className="rounded-[24px] border border-line px-5 py-4">
                <p className="text-sm font-semibold text-ink">
                  {message.name} · {message.email}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {formatDate(message.createdAt)}
                  {message.company ? ` · ${message.company}` : ""}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{message.message}</p>
              </article>
            ))
          )}
        </div>
      </div>
    );
  }

  const enabled = user.status === "habilitado" && user.subdomain && user.platformUser && user.platformPassword;

  return (
    <div className="p-5 sm:p-8">
      <p className="text-sm font-semibold text-blue">{user.company}</p>
      <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Hola, {user.name.split(" ")[0]}.
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Recibimos tu solicitud del plan {planLabel(user.planInterest)} el {formatDate(user.createdAt)}. Este espacio solo muestra el estado de tu habilitación.
      </p>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        {enabled ? (
          <AccessCard subdomain={user.subdomain} username={user.platformUser} password={user.platformPassword} />
        ) : (
          <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-700">En proceso</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Tu cuenta está en proceso de habilitación.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Estamos preparando tu plataforma de facturación. Cuando quede lista, aquí vas a ver el enlace, el usuario y la contraseña. Desde esta página no se factura.
            </p>
          </section>
        )}

        <section className="rounded-[28px] border border-line p-6">
          <h2 className="font-display text-xl font-semibold">Datos de tu solicitud</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <Info label="Empresa" value={user.company} />
            <Info label="Correo" value={user.email} />
            <Info label="Teléfono" value={user.phone || "No lo registraste"} />
            <Info label="Plan" value={planLabel(user.planInterest)} />
            <Info label="NIT" value={user.profile?.nit || "Pendiente"} />
            <Info label="Ciudad" value={user.profile?.city || "Pendiente"} />
          </dl>
        </section>
      </div>

      <section className="mt-6 max-w-2xl rounded-[28px] border border-line p-6">
        <h2 className="font-display text-xl font-semibold">Completa los datos para la habilitación</h2>
        <p className="mt-1 text-sm text-muted">Razón social, NIT y ciudad nos sirven para dejarte la plataforma lista.</p>
        <div className="mt-4">
          <CompanyForm
            initial={{
              tradeName: user.profile?.tradeName || user.company,
              nit: user.profile?.nit || "",
              city: user.profile?.city || "",
              address: user.profile?.address || "",
            }}
          />
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-[24px] border border-line bg-[#f8fbff] p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
    </article>
  );
}

function StatusBadge({ status }: { status: string }) {
  const enabled = status === "habilitado";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${enabled ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
      {enabled ? "Habilitado" : "En proceso"}
    </span>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line pb-2">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}
