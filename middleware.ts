import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken } from "@/utils/jwt";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (!pathname.startsWith("/api/") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }
  const token = req.cookies.get("auth-token")?.value ?? null;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
