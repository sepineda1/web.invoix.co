import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { companySchema, firstError } from "@/lib/validators";
import { jsonError, jsonOk } from "@/lib/http";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.sub) return jsonError("Inicia sesión para continuar", 401);

  const body = await request.json().catch(() => null);
  const parsed = companySchema.safeParse(body);
  if (!parsed.success) return jsonError(firstError(parsed.error), 400);

  await prisma.companyProfile.upsert({
    where: { userId: session.sub },
    update: {
      tradeName: parsed.data.tradeName,
      nit: parsed.data.nit,
      city: parsed.data.city,
      address: parsed.data.address || "",
    },
    create: {
      userId: session.sub,
      tradeName: parsed.data.tradeName,
      nit: parsed.data.nit,
      city: parsed.data.city,
      address: parsed.data.address || "",
    },
  });

  return jsonOk();
}
