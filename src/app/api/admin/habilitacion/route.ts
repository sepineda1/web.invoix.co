import { prisma } from "@/lib/prisma";
import { isSubdomain, normalizeSubdomain } from "@/lib/format";
import { requireAdmin } from "@/lib/admin";
import { jsonError, jsonOk } from "@/lib/http";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return jsonError("Solo el administrador puede habilitar cuentas", 403);

  const body = (await request.json().catch(() => null)) as {
    userId?: string;
    status?: string;
    subdomain?: string;
    platformUser?: string;
    platformPassword?: string;
  } | null;

  if (!body?.userId) return jsonError("Falta la solicitud", 400);
  if (body.status !== "pendiente" && body.status !== "habilitado") {
    return jsonError("El estado debe ser pendiente o habilitado", 400);
  }

  const target = await prisma.user.findUnique({ where: { id: body.userId } });
  if (!target || target.role === "admin") return jsonError("No encontramos esa solicitud", 404);

  const subdomain = normalizeSubdomain(body.subdomain ?? "");
  const platformUser = (body.platformUser ?? "").trim();
  const platformPassword = body.platformPassword ?? "";

  if (subdomain && !isSubdomain(subdomain)) {
    return jsonError("El subdominio solo puede llevar letras, números y guiones. Ejemplo: intesa", 400);
  }

  if (body.status === "habilitado") {
    if (!subdomain) return jsonError("Escribe el subdominio, por ejemplo intesa", 400);
    if (platformUser.length < 2) return jsonError("Escribe el usuario de la plataforma", 400);
    if (platformPassword.length < 4) return jsonError("Escribe la contraseña de la plataforma", 400);
  }

  if (subdomain) {
    const taken = await prisma.user.findFirst({
      where: { subdomain, NOT: { id: target.id } },
    });
    if (taken) return jsonError("Ese subdominio ya está asignado a otro cliente", 409);
  }

  await prisma.user.update({
    where: { id: target.id },
    data: {
      status: body.status,
      subdomain,
      platformUser,
      platformPassword,
    },
  });

  return jsonOk();
}
