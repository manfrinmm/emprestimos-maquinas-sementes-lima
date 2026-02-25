import { isValidToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: { children: React.ReactNode }) {
  const token = (await cookies()).get("auth-token")?.value ?? null;
  if (!isValidToken(token)) redirect("/login");
  return <>{children}</>;
}
