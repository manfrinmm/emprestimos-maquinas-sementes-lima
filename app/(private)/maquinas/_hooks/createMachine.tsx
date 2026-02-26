"use client";

import { useCallback, useState } from "react";
import { useSWRConfig } from "swr";
import type { CreateMachineInput } from "@/app/api/machine/schema";
import { fetchWithAuth } from "@/app/(private)/_utils/fetchWithAuth";

export function useCreateMachine() {
  const [isPending, setPending] = useState(false);
  const { mutate } = useSWRConfig();

  const mutateMachine = useCallback(
    (
      input: CreateMachineInput,
      opts?: { onSuccess?: () => void; onError?: (err: Error) => void }
    ) => {
      setPending(true);
      fetchWithAuth("/api/machine", {
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
          mutate((k: unknown) => Array.isArray(k) && k[0] === "machines");
          opts?.onSuccess?.();
        })
        .catch((err: Error) => {
          opts?.onError?.(err);
        })
        .finally(() => {
          setPending(false);
        });
    },
    [mutate]
  );

  return { mutate: mutateMachine, isPending };
}
