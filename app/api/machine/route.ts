import { NextResponse } from "next/server";
import { createMachineController, getMachinesController } from "./controller";

export async function POST(req: Request) {
  try {
    const result = await createMachineController(req);
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
    const result = await getMachinesController(req.url);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[GET /api/machine]", err);
    return NextResponse.json(
      { error: "Erro ao buscar máquinas" },
      { status: 500 }
    );
  }
}