import { NextResponse } from "next/server";
import { getSellersController } from "./controller";

export async function GET() {
  try {
    return await getSellersController();
  } catch (err) {
    console.error("[GET /api/sellers]", err);
    return NextResponse.json(
      { error: "Erro ao buscar vendedores" },
      { status: 500 }
    );
  }
}