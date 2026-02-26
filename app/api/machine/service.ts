import { prisma } from "../(prisma)";
import type { CreateMachineInput, UpdateMachineInput } from "./schema";
import { Machine } from "./type";
import { getSellers } from "../sellers/service";
import { decodeJwt } from "jose";

async function resolveUserIdFromSellerExternalId(
  sellerExternalId: string,
  token: string | null
): Promise<string | null> {
  let user = await prisma.user.findUnique({ where: { externalId: sellerExternalId } });
  if (!user) {
    const sellers = await getSellers(token);
    const seller = sellers.find((s) => s.id === sellerExternalId);
    if (!seller) return null;
    user = await prisma.user.create({
      data: {
        externalId: seller.id,
        name: seller.name,
        email: seller.email,
        role: "seller",
      },
    });
  }
  return user.id;
}

async function resolveUserId(
  token: string | null,
  input: { sellerExternalId?: string | null; userId?: string | null }
): Promise<string | null | undefined> {
  if (token) {
    const payload = decodeJwt(token) as { id?: string; role?: string };
    if (payload.role === "seller" && payload.id) {
      return resolveUserIdFromSellerExternalId(payload.id, token);
    }
  }
  if (input.sellerExternalId !== undefined) {
    return input.sellerExternalId
      ? resolveUserIdFromSellerExternalId(input.sellerExternalId, token)
      : null;
  }
  if (input.userId !== undefined) return input.userId;
  return undefined;
}

export async function getMachines(): Promise<Machine[]> {
  return prisma.machine.findMany({
    include: { user: { select: { id: true, name: true, externalId: true } } },
  }) as Promise<Machine[]>;
}

export async function createMachine(input: CreateMachineInput, token: string | null = null): Promise<Machine> {
  const userId = (await resolveUserId(token, input)) ?? null;
  const created = await prisma.machine.create({
    data: {
      name: input.name,
      serialNumber: input.serialNumber,
      stickerNumber: input.stickerNumber,
      comment: input.comment ?? "",
      status: input.status ?? true,
      maintenance: input.maintenance ?? false,
      ...(userId ? { userId } : {}),
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

export async function updateMachine(id: string, input: UpdateMachineInput, token: string | null = null): Promise<Machine> {
  const userId = await resolveUserId(token, input);
  const updated = await prisma.machine.update({
    where: { id },
    data: {
      ...(input.name != null && { name: input.name }),
      ...(input.serialNumber != null && { serialNumber: input.serialNumber }),
      ...(input.stickerNumber != null && { stickerNumber: input.stickerNumber }),
      ...(input.comment != null && { comment: input.comment }),
      ...(userId !== undefined && { userId }) as { userId?: string | null },
      ...(input.status !== undefined && { status: input.status }),
      ...(input.maintenance !== undefined && { maintenance: input.maintenance }),
    },
    include: { user: { select: { id: true, name: true, externalId: true } } },
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