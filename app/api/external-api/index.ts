import axios from "axios";
import { cache } from "../cache";
import { Seller } from "../sellers/type";

const EXTERNAL_API_BASE_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL || "";

export async function fetchSellers(token: string | null): Promise<Seller[]> {
  const cached = cache.get<Seller[]>("seller");
  if (cached) return cached;

  const response = await axios.get<Seller[]>(EXTERNAL_API_BASE_URL + "/users", {
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
  cache.set("seller", response.data);
  return response.data;
}