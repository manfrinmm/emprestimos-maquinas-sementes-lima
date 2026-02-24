import { NextResponse } from "next/server";
import { loginController } from "./controller";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await loginController({ email: body.email, password: body.password });
    if (result.status === 400) return NextResponse.json({ error: result.error }, { status: 400 });
    const res = NextResponse.json({ user: result.user, token: result.token });
    res.cookies.set("auth-token", result.token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 });
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
