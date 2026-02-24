import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuthToken } from "../api/auth/service";


export default async function PrivateLayout({
  children,
}: { children: React.ReactNode }) {
  const token = (await cookies()).get("auth-token")?.value ?? null;
  const payload = token ? await verifyAuthToken(token) : null;
  if (!payload) redirect("/login");
  return <>{children}</>;
}
