import { login as loginService } from "./service";
import type { LoginInput, FieldErrors } from "./types";
import type { User } from "../user/type";
import { loginSchema } from "./schema";
export type LoginControllerResult =
  | { status: 200; user: User; token: string }
  | { status: 400; error: string | FieldErrors };

export async function loginController(input: LoginInput): Promise<LoginControllerResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { status: 400, error: parsed.error.flatten().fieldErrors };
  const { email, password } = parsed.data;
  const result = await loginService(email, password);
  if (!result.ok) return { status: 400, error: result.error };
  return { status: 200, user: result.user, token: result.token };
}
