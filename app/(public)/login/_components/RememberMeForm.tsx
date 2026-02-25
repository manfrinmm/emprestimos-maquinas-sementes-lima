"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearUrlOnInput } from "@/utils";
import { useUserStore } from "@/store/user";
import type { LoginActionResult } from "../_action/loginAction";

const REMEMBER_KEY = "login-remember";
const EMAIL_KEY = "login-email";

type Props = {
  action: (formData: FormData) => Promise<LoginActionResult>;
  hasError?: boolean;
  children: React.ReactNode;
};

export function RememberMeForm({ action, hasError, children }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (!hasError || !formRef.current) return;
    return clearUrlOnInput(formRef.current, ["input[name=email]", "input[name=password]"], () =>
      router.replace("/login", { scroll: false })
    );
  }, [hasError, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(REMEMBER_KEY);
    const email = localStorage.getItem(EMAIL_KEY);
    if (saved !== "true" || !email) return;
    const run = () => {
      if (!formRef.current) return;
      const emailInput = formRef.current.querySelector<HTMLInputElement>("input[name=email]");
      const rememberEl = formRef.current.querySelector("#remember");
      if (emailInput) emailInput.value = email;
      if (rememberEl?.getAttribute("data-state") !== "checked") (rememberEl as HTMLElement)?.click();
    };
    const t = setTimeout(run, 0);
    return () => clearTimeout(t);
  }, [hasError]);

  return (
    <form
      ref={formRef}
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const remember = form.querySelector("#remember")?.getAttribute("data-state") === "checked";
        if (remember) {
          const email = (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
          localStorage.setItem(REMEMBER_KEY, "true");
          if (email) localStorage.setItem(EMAIL_KEY, email);
        } else {
          localStorage.removeItem(REMEMBER_KEY);
          localStorage.removeItem(EMAIL_KEY);
        }
        const formData = new FormData(form);
        const result = await action(formData);
        if (result?.success) {
          setUser(result.user);
          router.push("/");
        }
      }}
    >
      {children}
    </form>
  );
}
