import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo"),
  company: z.string().trim().min(2, "Escribe el nombre de tu negocio"),
  email: z.string().trim().email("Escribe un correo válido").transform((value) => value.toLowerCase()),
  phone: z.string().trim().optional().or(z.literal("")),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  plan: z.enum(["basico", "pro", "elite"]).default("pro"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Escribe un correo válido").transform((value) => value.toLowerCase()),
  password: z.string().min(1, "Escribe tu contraseña"),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre"),
  email: z.string().trim().email("Escribe un correo válido"),
  phone: z.string().trim().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Cuéntanos un poco más, mínimo 10 caracteres"),
});

export const companySchema = z.object({
  tradeName: z.string().trim().min(2, "Escribe la razón social"),
  nit: z.string().trim().min(5, "Escribe el NIT"),
  city: z.string().trim().min(2, "Escribe la ciudad"),
  address: z.string().trim().optional().or(z.literal("")),
});

export function firstError(error: z.ZodError) {
  return error.issues[0]?.message ?? "Revisa los datos e inténtalo de nuevo";
}
