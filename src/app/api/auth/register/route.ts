import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession } from "@/lib/auth";
import { firstError, registerSchema } from "@/lib/validators";
import { jsonError, jsonOk, withSession } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return jsonError(firstError(parsed.error), 400);

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return jsonError("Ya existe una cuenta con ese correo", 409);

  const password = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password,
      company: parsed.data.company,
      phone: parsed.data.phone || null,
      planInterest: parsed.data.plan,
      role: "client",
      status: "pendiente",
      profile: {
        create: {
          tradeName: parsed.data.company,
        },
      },
    },
  });

  const token = await signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  return withSession(jsonOk(), token);
}
