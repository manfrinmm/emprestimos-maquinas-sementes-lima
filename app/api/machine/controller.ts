import { NextResponse } from "next/server";
import { createMachineSchema, listMachinesQuerySchema, UpdateMachineInput, updateMachineSchema } from "./schema";
import { createMachine, deleteMachine, getMachines, updateMachine } from "./service";
import { Machine } from "./type";
import { cookies } from "next/headers";

export async function createMachineController(req: Request): Promise<Machine | NextResponse> {
  const body = await req.json();
  const token = (await cookies()).get("auth-token")?.value ?? null;

  const parsed = createMachineSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  return await createMachine(parsed.data, token);
}

export async function getMachinesController(url: string): Promise<{ machines: Machine[]; total: number } | NextResponse> {
  const { searchParams } = new URL(url);
  const token = (await cookies()).get("auth-token")?.value ?? null;
  const parsed = listMachinesQuerySchema.safeParse(Object.fromEntries(searchParams));
  const query = parsed.success ? parsed.data : { page: 1, limit: 10, status: "all" as const };
  return await getMachines(token, query);
}

export async function updateMachineController(req: Request, { params }: { params: Promise<{ id: string }> }): Promise<Machine | NextResponse> {
  const { id } = await params;
  const body = await req.json();
  const token = (await cookies()).get("auth-token")?.value ?? null;

  const parsed = updateMachineSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  return await updateMachine(id, parsed.data, token);
}

export async function deleteMachineController(id: string): Promise<void | NextResponse> {
  await deleteMachine(id);
}