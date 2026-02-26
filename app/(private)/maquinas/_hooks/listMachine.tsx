"use client";

import { useState, useCallback } from "react";
import { Machine } from "@/app/api/machine/type";
import useSWR from "swr";
import { fetchWithAuth } from "@/app/(private)/_utils/fetchWithAuth";

export type ListMachinesParams = {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sellerId?: string;
};

export type FiltersValues = {
  search: string;
  status: string;
  sellerId?: string;
};

export type ListMachinesResult = {
  machines: Machine[];
  total: number;
};

export const machinesListKey = (params: ListMachinesParams) =>
  ["machines", params.page, params.limit, params.search ?? "", params.status ?? "all", params.sellerId ?? ""] as const;

const buildUrl = (params: ListMachinesParams) => {
  const { page, limit, search = "", status = "all", sellerId } = params;
  const query = new URLSearchParams({ page: String(page), limit: String(limit), status });
  if (search) query.set("search", search);
  if (sellerId) query.set("sellerId", sellerId);
  return `/api/machine?${query}`;
};

const fetcher = async (url: string): Promise<ListMachinesResult> => {
  const res = await fetchWithAuth(url);
  if (!res.ok) throw new Error("Erro ao buscar máquinas");
  const json = await res.json();
  return {
    machines: json.machines ?? json ?? [],
    total: json.total ?? (Array.isArray(json) ? json.length : json.machines?.length ?? 0),
  };
};

export function useListMachines(params: { page: number; limit: number }) {
  const { page, limit } = params;
  const [filters, setFilters] = useState<FiltersValues>({ search: "", status: "all" });
  const fullParams: ListMachinesParams = { page, limit, ...filters };
  const key = machinesListKey(fullParams);
  const url = buildUrl(fullParams);

  const { data, error, isLoading, mutate } = useSWR(key, () => fetcher(url), {
    revalidateOnFocus: false,
  });

  console.log(filters)

  const refetch = useCallback(
    (values?: FiltersValues) => {
      if (values) setFilters(values);
      else mutate();
    },
    [mutate]
  );

  return {
    machines: data?.machines ?? [],
    total: data?.total ?? 0,
    isLoading,
    error: error ?? null,
    refetch,
  };
}
