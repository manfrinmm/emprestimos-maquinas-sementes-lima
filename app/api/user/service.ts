import { prisma } from "../(prisma)";
import type { User } from "./type";

const toUserRole = (role: string): "admin" | "seller" =>
  role?.toLowerCase() === "admin" ? "admin" : "seller";

export async function createOrUpdateUser(user: User) {
  const existingUser = user.id
    ? await prisma.user.findUnique({ where: { externalId: user.id } })
    : await prisma.user.findUnique({ where: { email: user.email } });
  if (existingUser) {
    return existingUser;
  }
  const newUser = await prisma.user.create({
    data: {
      externalId: user.id,
      name: user.name,
      email: user.email,
      role: toUserRole(user.role),
    },
  });
  return newUser;
}