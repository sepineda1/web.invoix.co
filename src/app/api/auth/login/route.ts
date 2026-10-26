import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession } from "@/lib/auth";
import { firstError, loginSchema } from "@/lib/validators";
import { jsonError, jsonOk, withSession } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return jsonError(firstError(parsed.error), 400);

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return jsonError("Correo o contraseña incorrectos", 401);

  const valid = await bcrypt.compare(parsed.data.password, user.password);
  if (!valid) return jsonError("Correo o contraseña incorrectos", 401);

  const token = await signSession({ sub: user.id, email: user.email, name: user.name, role: user.role });
  return withSession(jsonOk(), token);
}
