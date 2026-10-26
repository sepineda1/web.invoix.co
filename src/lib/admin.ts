import { prisma } from "./prisma";
import { getSession } from "./session";

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.sub) return null;
  const user = await prisma.user.findUnique({ where: { id: session.sub } });
  if (!user || user.role !== "admin") return null;
  return user;
}
