import { Seller } from "./type";
import { Cache } from "../cache";

const sellersCache = new Cache<Seller[]>();

export async function getSellers(token: string | null): Promise<Seller[]> {
  const sellers = await sellersCache.getSellers(token);
  return sellers.filter((user) => user.role === 'seller' && user.is_active);
}