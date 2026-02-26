import { decodeJwt } from "jose";

export function isTokenExpired(token: string): boolean {
    try {
      const { exp, ...payload } = decodeJwt(token);
      if (exp == null || payload.id == null) return true;
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  export function isValidToken(token: string | null): boolean {
    return token !== null && token.length > 0 && !isTokenExpired(token);
  }

  export function getPayload(token: string): { id?: string; role?: string } {
    return decodeJwt(token) as { id?: string; role?: string };
  }