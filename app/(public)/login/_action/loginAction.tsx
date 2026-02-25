"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { loginController } from "@/app/api/auth/controller";
import type { User } from "@/app/api/user/type";

export type LoginActionResult = { success: true; user: User } | undefined;

export async function loginAction(formData: FormData): Promise<LoginActionResult> {
  const result = await loginController({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (result.status === 400) {
    const err = typeof result.error === "string" ? result.error : JSON.stringify(result.error);
    redirect("/login?error=" + encodeURIComponent(err));
  }
  const cookieStore = await cookies();
  cookieStore.set("auth-token", result.token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 });
  return { success: true, user: result.user };
}
  