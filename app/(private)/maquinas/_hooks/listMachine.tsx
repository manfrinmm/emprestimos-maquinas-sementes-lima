"use client";

import { Machine } from "@/app/api/machine/type";
import useSWR from "swr";
import { fetchWithAuth } from "@/app/(private)/_utils/fetchWithAuth";

export type ListMachinesParams = {
  page: number;
  limit: number;
  search?: string;
  status?: string;
};

export type ListMachinesResult = {
  machines: Machine[];
  total: number;
};

export const machinesListKey = (params: ListMachinesParams) =>
  ["machines", params.page, params.limit, params.search ?? "", params.status ?? "all"] as const;

const fetcher = async (url: string): Promise<ListMachinesResult> => {
  const res = await fetchWithAuth(url);
  if (!res.ok) throw new Error("Erro ao buscar máquinas");
  const json = await res.json();
  return {
    machines: json.machines ?? json ?? [],
    total: json.total ?? (Array.isArray(json) ? json.length : json.machines?.length ?? 0),
  };
};

export function useListMachines(params: ListMachinesParams) {
  const { page, limit, search = "", status = "all" } = params;
  const key = machinesListKey({ page, limit, search, status });
  const url = (() => {
    const query = new URLSearchParams({ page: String(page), limit: String(limit), status });
    if (search) query.set("search", search);
    return `/api/machine?${query}`;
  })();

  const { data, error, isLoading, mutate } = useSWR(key, () => fetcher(url), {
    revalidateOnFocus: false,
  });

  return {
    machines: data?.machines ?? [],
    total: data?.total ?? 0,
    isLoading,
    error: error ?? null,
    refetch: mutate,
  };
}
