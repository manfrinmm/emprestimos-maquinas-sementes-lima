import { logoutAction } from "@/app/(private)/_actions/logoutAction";

export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(input, { ...init, credentials: "include" });
  if (res.status === 401) {
    await logoutAction();
  }
  return res;
}
