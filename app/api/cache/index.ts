import axios from "axios";
import { Seller } from "../sellers/type";

const CACHE_TTL_MS = 10 * 60 * 1000;
const EXTERNAL_API_BASE_URL = process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL || '';

export class Cache<T> {
  private data: {
    [key: string]: {
      data: T;
      expiresAt: number;
    };
  } = {};

  async getSellers(token: string | null): Promise<Seller[]> {
    const entry = this.data["seller"];
    if (entry && Date.now() < entry.expiresAt) {
      return entry.data as Seller[];
    }
    const response = await axios.get<Seller[]>(EXTERNAL_API_BASE_URL + '/users', {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    });
  
    this.set("seller", response.data as T);
    return response.data as Seller[];
  }

  set(key: string, data: T): void {
    this.data[key] = {
      data,
      expiresAt: Date.now() + CACHE_TTL_MS,
    };
  }
}