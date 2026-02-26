import { NextResponse } from "next/server";
import { deleteMachineController, updateMachineController } from "../controller";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = await updateMachineController(id, body);
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
