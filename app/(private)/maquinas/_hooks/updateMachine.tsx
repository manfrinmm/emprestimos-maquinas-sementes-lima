"use client";

import { useState, useCallback } from "react";
import { useSWRConfig } from "swr";
import type { UpdateMachineInput } from "@/app/api/machine/schema";
import { fetchWithAuth } from "@/app/(private)/_utils/fetchWithAuth";

export function useUpdateMachine() {
  const [isPending, setPending] = useState(false);
  const { mutate } = useSWRConfig();

  const updateMachine = useCallback(
    (
      id: string,
      input: UpdateMachineInput,
      opts?: { onSuccess?: () => void; onError?: (err: Error) => void }
    ) => {
      setPending(true);
      fetchWithAuth(`/api/machine/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error ?? "Erro ao atualizar máquina");
          }
          return res.json();
        })
        .then(() => {
          mutate((k: unknown) => Array.isArray(k) && k[0] === "machines");
          opts?.onSuccess?.();
        })
        .catch((err: Error) => opts?.onError?.(err))
        .finally(() => setPending(false));
    },
    [mutate]
  );

  return { updateMachine, isPending };
}
