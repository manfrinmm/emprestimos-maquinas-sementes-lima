import { prisma } from "../(prisma)";
import { createOrUpdateUser } from "../user/service";
import { loginSchema } from "./schema";
import type { LoginInput, LoginResult, ExternalSessionResponse } from "./types";
import axios from 'axios'

const EXTERNAL_API_BASE_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL || ''

export type JwtPayload = { name: string; email: string };

export async function login(input: LoginInput): Promise<LoginResult> {

  // const { email, password } = loginSchema.parse(input);
  const result = loginSchema.safeParse(input);
  if (!result.success) return { ok: false, error: result.error.flatten().fieldErrors };
  const { email, password } = result.data;
  try {
    const res = await axios.post<ExternalSessionResponse>(EXTERNAL_API_BASE_URL + '/sessions', { email, password });
    await createOrUpdateUser(res.data.user);
    return { ok: true, user: res.data.user, token: res.data.token };
  } catch (error) {
    return { ok: false, error: "Erro ao fazer login, verifique suas credenciais" };
  }
}

