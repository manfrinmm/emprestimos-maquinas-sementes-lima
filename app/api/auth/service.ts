import { prisma } from "../(prisma)";
import type { LoginInput, LoginResult } from "./types";

export async function login(input: LoginInput): Promise<LoginResult> {
  if (!prisma) return { ok: false, error: "Erro ao conectar ao banco de dados" };

  const { email, password } = input;
  if (!email?.trim() || !password?.trim()) return { ok: false, error: "Email e senha obrigatórios" };
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user);

  const token = "fake-jwt-" + Math.random().toString(36).slice(2);
  return { ok: true, user: { id: "1", email: email.trim() }, token };
}
