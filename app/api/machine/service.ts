import { prisma } from "../(prisma)";
import type { CreateMachineInput, UpdateMachineInput } from "./schema";
import { Machine } from "./type";

export async function getMachines(): Promise<Machine[]> {
  return prisma.machine.findMany({
    include: { user: { select: { id: true, name: true } } },
  }) as Promise<Machine[]>;
}

export async function createMachine(input: CreateMachineInput): Promise<Machine> {
  const created = await prisma.machine.create({
    data: {
      name: input.name,
      serialNumber: input.serialNumber,
      stickerNumber: input.stickerNumber,
      comment: input.comment ?? "",
      status: input.status ?? true,
      maintenance: input.maintenance ?? false,
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

export async function updateMachine(id: string, input: UpdateMachineInput): Promise<Machine> {
  const updated = await prisma.machine.update({
    where: { id },
    data: {
      ...(input.name != null && { name: input.name }),
      ...(input.serialNumber != null && { serialNumber: input.serialNumber }),
      ...(input.stickerNumber != null && { stickerNumber: input.stickerNumber }),
      ...(input.comment != null && { comment: input.comment }),
      ...(input.userId !== undefined && { userId: input.userId }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.maintenance !== undefined && { maintenance: input.maintenance }),
    },
    include: { user: { select: { id: true, name: true } } },
  });
  return {
    id: updated.id,
    name: updated.name,
    serialNumber: updated.serialNumber,
    stickerNumber: updated.stickerNumber,
    comment: updated.comment,
    status: updated.status,
    maintenance: updated.maintenance,
    userId: updated.userId,
    user: updated.user ?? undefined,
  };
}

export async function deleteMachine(id: string): Promise<void> {
  await prisma.machine.delete({ where: { id } });
}