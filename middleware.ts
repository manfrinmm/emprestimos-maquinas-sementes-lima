import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken } from "@/utils/jwt";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("auth-token")?.value ?? null;
  const hasValidToken = isValidToken(token);

  if (pathname === "/login" && hasValidToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!pathname.startsWith("/api/") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }
  if (!hasValidToken) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/api/:path*"],
};
