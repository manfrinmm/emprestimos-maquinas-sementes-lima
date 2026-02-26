import { login as loginService } from "./service";
import type { LoginControllerResult, LoginInput } from "./types";

import { loginSchema } from "./schema";

export async function loginController(input: LoginInput): Promise<LoginControllerResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { status: 400, error: parsed.error.flatten().fieldErrors };

  const { email, password } = parsed.data;
  const result = await loginService(email, password);
  
  if (!result.ok) return { status: 400, error: result.error };

  return { status: 200, user: result.user, token: result.token };
}
