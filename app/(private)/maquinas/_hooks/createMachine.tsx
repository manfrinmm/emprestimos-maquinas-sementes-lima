"use client";

import { useCallback, useState } from "react";
import type { CreateMachineInput } from "@/app/api/machine/schema";

export function useCreateMachine() {
  const [isPending, setPending] = useState(false);

  const mutate = useCallback(
    (
      input: CreateMachineInput,
      opts?: { onSuccess?: () => void; onError?: (err: Error) => void }
    ) => {
      setPending(true);
      fetch("/api/machine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error ?? "Erro ao cadastrar máquina");
          }
          return res.json();
        })
        .then(() => {
          opts?.onSuccess?.();
        })
        .catch((err: Error) => {
          opts?.onError?.(err);
        })
        .finally(() => {
          setPending(false);
        });
    },
    []
  );

  return { mutate, isPending };
}