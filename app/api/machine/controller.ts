import { NextResponse } from "next/server";
import { CreateMachineInput, createMachineSchema, UpdateMachineInput, updateMachineSchema } from "./schema";
import { createMachine, deleteMachine, getMachines, updateMachine } from "./service";
import { Machine } from "./type";

export async function createMachineController(body: CreateMachineInput): Promise<Machine | NextResponse> {
    const parsed = createMachineSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return await createMachine(parsed.data);
}

export async function getMachinesController(): Promise<Machine[] | NextResponse> {
    return await getMachines();
}

export async function updateMachineController(id: string, body: UpdateMachineInput): Promise<Machine | NextResponse> {
  const parsed = updateMachineSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  return await updateMachine(id, parsed.data);
}

export async function deleteMachineController(id: string): Promise<void | NextResponse> {
  await deleteMachine(id);
}