import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken } from "@/utils/jwt";

const PUBLIC_PATHS = ["/login"];
const API_AUTH_PATH = "/api/auth";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("auth-token")?.value ?? null;
  const hasValidToken = isValidToken(token);

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    if (hasValidToken) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (pathname.startsWith(API_AUTH_PATH)) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    if (!hasValidToken) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    return NextResponse.next();
  }

  if (!hasValidToken) return NextResponse.redirect(new URL("/login", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
