"use client";

import { useCallback, useEffect, useState } from "react";

export type MachineWithUser = {
  id: string;
  name: string;
  serialNumber: string;
  stickerNumber: string;
  comment: string;
  status: boolean;
  maintenance: boolean;
  userId: string | null;
  user?: { id: string; name: string } | null;
};

export type ListMachinesParams = {
  page: number;
  limit: number;
  search?: string;
  status?: string;
};

export type ListMachinesResult = {
  machines: MachineWithUser[];
  total: number;
};

export function useListMachines(params: ListMachinesParams) {
  const { page, limit, search = "", status = "all" } = params;
  const [data, setData] = useState<ListMachinesResult>({
    machines: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        status,
      });
      if (search) query.set("search", search);
      const res = await fetch(`/api/machine?${query}`);
      if (!res.ok) throw new Error("Erro ao buscar máquinas");
      const json = await res.json();
      setData({
        machines: json.machines ?? json ?? [],
        total: json.total ?? (Array.isArray(json) ? json.length : json.machines?.length ?? 0),
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao buscar máquinas"));
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, status]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...data, isLoading, error, refetch };
}
