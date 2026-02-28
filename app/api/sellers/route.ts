import { NextResponse } from "next/server";
import { getSellersController } from "./controller";
import { requireAction } from "@/utils/user";

export async function GET() {
  try {
    const forbidden = await requireAction('machine', 'create', "Você não tem permissão para visualizar vendedores");
    if (forbidden) return forbidden;
    
    return await getSellersController();
  } catch (err) {
    console.error("[GET /api/sellers]", err);
    return NextResponse.json(
      { error: "Erro ao buscar vendedores" },
      { status: 500 }
    );
  }
}