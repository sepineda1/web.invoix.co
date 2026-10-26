import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, readSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const login = request.nextUrl.clone();
  login.pathname = "/iniciar-sesion";
  login.searchParams.set("next", request.nextUrl.pathname);

  if (!token) {
    return NextResponse.redirect(login);
  }

  try {
    const session = await readSession(token);
    const isAdminArea =
      request.nextUrl.pathname.startsWith("/panel/solicitudes") ||
      request.nextUrl.pathname.startsWith("/panel/mensajes");
    if (isAdminArea && session.role !== "admin") {
      const panel = request.nextUrl.clone();
      panel.pathname = "/panel";
      panel.search = "";
      return NextResponse.redirect(panel);
    }
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(login);
    response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  }
}

export const config = {
  matcher: ["/panel/:path*"],
};
