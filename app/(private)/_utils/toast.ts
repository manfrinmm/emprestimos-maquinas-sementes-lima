import * as sonner from "sonner";

const ignoreMessage = (arg: unknown): boolean => {
  const msg = typeof arg === "string" ? arg : (arg as Error)?.message;
  return msg === "NEXT_REDIRECT" || (typeof (arg as { digest?: string })?.digest === "string" && (arg as { digest: string }).digest.startsWith("NEXT_REDIRECT"));
};

const base = sonner.toast as typeof sonner.toast;
export const toast = Object.assign(
  (...args: Parameters<typeof base>) => (base as (...a: Parameters<typeof base>) => unknown)(...args),
  {
    ...base,
    error: (arg: Parameters<typeof base.error>[0]) => {
      if (ignoreMessage(arg)) {
        base.error("Login expirado");
        return;
      }
      base.error(arg);
    },
  }
);

export { Toaster } from "sonner";
