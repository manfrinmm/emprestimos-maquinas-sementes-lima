import { cookies } from "next/headers";
import { getSellers } from "./service";
import { decodeJwt } from "jose";
import { NextResponse } from "next/server";

export async function getSellersController(): Promise<NextResponse> {
  const token = (await cookies()).get("auth-token")?.value ?? null;
  const payload = decodeJwt(token!) as { role?: string };
  if (payload.role !== "admin") {
    return NextResponse.json({ data: [] }, { status: 403 });
  }
  return NextResponse.json(await getSellers(token), { status: 200 });
}