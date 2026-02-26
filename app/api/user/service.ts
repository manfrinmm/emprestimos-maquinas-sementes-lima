import { UserRole } from "@prisma/client";
import { prisma } from "../(prisma)";
import type { User } from "./type";

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
      role: user.role.toLowerCase() as UserRole,
    },
  });
  return newUser;
}