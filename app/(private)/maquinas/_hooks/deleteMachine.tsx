"use client";

import { useCallback, useState } from "react";
import { useSWRConfig } from "swr";
import { toast } from "sonner";

export function useDeleteMachine() {
  const [isPending, setPending] = useState(false);
  const { mutate } = useSWRConfig();

  const deleteMachine = useCallback(
    (
      id: string,
      opts?: { onSuccess?: () => void; onError?: (err: Error) => void }
    ) => {
      setPending(true);
      fetch(`/api/machine/${id}`, { method: "DELETE", credentials: "include" })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error ?? "Erro ao excluir máquina");
          }
        })
        .then(() => {
          mutate((k: unknown) => Array.isArray(k) && k[0] === "machines");
          opts?.onSuccess?.();
        })
        .catch((err: Error) => {
          toast.error(err.message);
          opts?.onError?.(err);
        })
        .finally(() => {
          setPending(false);
        });
    },
    [mutate]
  );

  return { deleteMachine, isPending };
}
