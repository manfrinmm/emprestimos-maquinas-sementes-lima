import { SignJWT, jwtVerify } from "jose";
import { prisma } from "../(prisma)";
import type { LoginInput, LoginResult } from "./types";

const JWT_SECRET = new TextEncoder().encode("mock-secret-machinetracker");
const JWT_ISSUER = "machinetracker";

export type JwtPayload = { name: string; email: string };

export async function login(input: LoginInput): Promise<LoginResult> {
  if (!prisma) return { ok: false, error: "Erro ao conectar ao banco de dados" };

  const { email, password } = input;
  if (!email?.trim() || !password?.trim()) return { ok: false, error: "Email e senha obrigatórios" };
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user);

  const token = await new SignJWT({
    name: "joaozinho",
    email: "joao@gmail.com",
  } as JwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(JWT_ISSUER)
    .setExpirationTime("1d")
    .sign(JWT_SECRET);

  return { ok: true, user: { id: "1", email: email.trim() }, token };
}

export async function verifyAuthToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { issuer: JWT_ISSUER });
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}
