import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const SESSION_COOKIE = "invoix_session";

export type SessionPayload = JWTPayload & {
  sub: string;
  email: string;
  name: string;
  role: string;
};

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) {
    throw new Error("Falta AUTH_SECRET");
  }
  return new TextEncoder().encode(value);
}

export async function signSession(input: { sub: string; email: string; name: string; role: string }) {
  return new SignJWT({ email: input.email, name: input.name, role: input.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(input.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function readSession(token: string) {
  const { payload } = await jwtVerify(token, secret());
  if (!payload.sub || typeof payload.email !== "string" || typeof payload.name !== "string") {
    throw new Error("Sesión inválida");
  }
  return {
    ...payload,
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
    role: typeof payload.role === "string" ? payload.role : "client",
  } as SessionPayload;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.COOKIE_SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
