import { NextResponse } from "next/server";
import { createMachineSchema, UpdateMachineInput, updateMachineSchema } from "./schema";
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

export async function getMachinesController(): Promise<Machine[] | NextResponse> {
  const token = (await cookies()).get("auth-token")?.value ?? null;
  return await getMachines(token);
}

export async function updateMachineController(id: string, body: UpdateMachineInput, token: string | null = null): Promise<Machine | NextResponse> {
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