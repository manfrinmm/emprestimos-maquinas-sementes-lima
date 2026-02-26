"use client";

import useSWR from "swr";

export type SellerOption = { id: string; name: string };

const fetcher = async (url: string): Promise<SellerOption[]> => {
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data?.data ?? []) ?? [];
};

const SELLERS_KEY = ["sellers"] as const;

export function useSellers(enabled: boolean) {
  const { data, isLoading, mutate } = useSWR<SellerOption[]>(
    enabled ? SELLERS_KEY : null,
    () => fetcher("/api/sellers"),
    { revalidateOnFocus: false }
  );

  return {
    sellers: data ?? [],
    isLoading,
    refetch: mutate,
  };
}
