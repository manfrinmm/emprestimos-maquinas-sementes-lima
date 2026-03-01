import { fetchSellers } from "../external-api";
import { Seller } from "./type";

export async function getSellers(token: string | null): Promise<Seller[]> {
  const sellers = await fetchSellers(token);
  return sellers.filter((user) => user.role === "seller" && user.is_active);
}