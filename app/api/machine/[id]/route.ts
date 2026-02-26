import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { deleteMachineController, updateMachineController } from "../controller";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const token = (await cookies()).get("auth-token")?.value ?? null;
    const result = await updateMachineController(id, body, token);
    if (result instanceof NextResponse) return result;
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/machine/[id]]", err);
    return NextResponse.json(
      { error: "Erro ao atualizar máquina" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = (await cookies()).get("auth-token")?.value ?? null;
    const payload = decodeJwt(token!) as { role?: string };
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Apenas admin pode excluir" }, { status: 403 });
    }
    const { id } = await params;
    await deleteMachineController(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("[DELETE /api/machine/[id]]", err);
    return NextResponse.json(
      { error: "Erro ao excluir máquina" },
      { status: 500 }
    );
  }
}
