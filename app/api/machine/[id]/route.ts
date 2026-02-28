import { NextResponse } from "next/server";
import { deleteMachineController, updateMachineController } from "../controller";
import { requireAction } from "@/utils/user";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const forbidden = await requireAction('machine', 'edit', "Você não tem permissão para atualizar máquinas");
    if (forbidden) return forbidden;

    const result = await updateMachineController(req, { params });
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
    const forbidden = await requireAction('machine', 'delete', "Você não tem permissão para excluir máquinas");
    if (forbidden) return forbidden;

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
