import { NextResponse } from "next/server";
import { deleteMachineController } from "../controller";

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
