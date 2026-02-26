import axios from "axios";
import { Seller } from "./type";

const EXTERNAL_API_BASE_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL || '';

export async function getSellers(token: string | null): Promise<Seller[]> {
  const response = await axios.get<Seller[]>(EXTERNAL_API_BASE_URL + '/users', {
    ...(token && { headers: { Authorization: `Bearer ${token}` } }),
  });
  const sellers = response.data
  .filter((user) => user.role === 'seller' && user.is_active);
  return sellers;
}