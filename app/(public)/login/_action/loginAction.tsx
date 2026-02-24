"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { loginController } from "@/app/api/auth/controller";

export async function loginAction(formData: FormData) {
    const result = await loginController({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    if (result.status === 400) redirect("/login?error=" + encodeURIComponent(result.error));
    const cookieStore = await cookies();
    cookieStore.set("auth-token", result.token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 });
    redirect("/");
  }
  