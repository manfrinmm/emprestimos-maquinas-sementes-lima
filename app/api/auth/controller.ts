import { login as loginService } from "./service";
import type { LoginInput } from "./types";

export type LoginControllerResult =
  | { status: 200; user: { id: string; email: string }; token: string }
  | { status: 400; error: string };

export async function loginController(input: LoginInput): Promise<LoginControllerResult> {
  const result = await loginService(input);
  if (!result.ok) return { status: 400, error: result.error };
  return { status: 200, user: result.user, token: result.token };
}
