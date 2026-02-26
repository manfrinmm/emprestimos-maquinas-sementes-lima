import { prisma } from "../(prisma)";
import type { CreateMachineInput } from "./schema";
import { Machine } from "./type";

export async function getMachines(): Promise<Machine[]> {
  return await prisma.machine.findMany();
}

export async function createMachine(input: CreateMachineInput): Promise<Machine> {
  const created = await prisma.machine.create({
    data: {
      name: input.name,
      serialNumber: input.serialNumber,
      stickerNumber: input.stickerNumber,
      comment: input.comment ?? "",
      status: true,
      maintenance: false,
      ...(input.userId ? { userId: input.userId } : {}),
    },
  });
  return {
    id: created.id,
    name: created.name,
    serialNumber: created.serialNumber,
    stickerNumber: created.stickerNumber,
    comment: created.comment,
    status: created.status,
    maintenance: created.maintenance,
    userId: created.userId,
  };
}

export async function deleteMachine(id: string): Promise<void> {
  await prisma.machine.delete({ where: { id } });
}