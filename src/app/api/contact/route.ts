import { prisma } from "@/lib/prisma";
import { contactSchema, firstError } from "@/lib/validators";
import { jsonError, jsonOk } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return jsonError(firstError(parsed.error), 400);

  await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      message: parsed.data.message,
    },
  });

  return jsonOk();
}
