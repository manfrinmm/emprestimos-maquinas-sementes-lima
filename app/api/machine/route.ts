import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { prisma } from "../(prisma)";
import { createMachineController, getMachinesController } from "./controller";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = (await cookies()).get("auth-token")?.value ?? null;
    if (token) {
      const payload = decodeJwt(token) as { id?: string; role?: string };
      if (payload.role === "seller" && payload.id) {
        const user = await prisma.user.findUnique({ where: { externalId: payload.id } });
        if (user) body.userId = user.id;
      }
    }
    const result = await createMachineController(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("[POST /api/machine]", err);
    return NextResponse.json(
      { error: "Erro ao cadastrar máquina" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const result = await getMachinesController();
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[GET /api/machine]", err);
    return NextResponse.json(
      { error: "Erro ao buscar máquinas" },
      { status: 500 }
    );
  }
}