import { z } from "zod";

export const createMachineSchema = z.object({
  name: z.string().min(3, "Nome da máquina é obrigatório").max(255, "Nome da máquina deve ter no máximo 255 caracteres"),
  serialNumber: z.string().min(1, "Número de série é obrigatório").max(255, "Número de série deve ter no máximo 255 caracteres"),
  stickerNumber: z.string().min(1, "Número do adesivo é obrigatório").max(255, "Número do adesivo deve ter no máximo 255 caracteres"),
  comment: z.string().max(1000, "Comentário deve ter no máximo 1000 caracteres").optional(),
  userId: z.string().max(25, "ID do usuário deve ter no máximo 25 caracteres").optional(),
  sellerExternalId: z.string().optional(),
  status: z.enum(["available", "maintenance", "disabled", "using"]).optional(),
});

export type CreateMachineInput = z.infer<typeof createMachineSchema>;

export const updateMachineSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  serialNumber: z.string().min(1).max(255).optional(),
  stickerNumber: z.string().min(1).max(255).optional(),
  comment: z.string().max(1000).optional(),
  userId: z.string().max(25).nullable().optional(),
  sellerExternalId: z.string().nullable().optional(),
  status: z.enum(["available", "maintenance", "disabled", "using"]).optional(),
});

export type UpdateMachineInput = z.infer<typeof updateMachineSchema>;

export const listMachinesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["all", "available", "maintenance", "disabled", "using"]).default("all"),
  sellerId: z.union([z.string().uuid(), z.literal("-1")]).optional(),
});

export type ListMachinesQuery = z.infer<typeof listMachinesQuerySchema>;