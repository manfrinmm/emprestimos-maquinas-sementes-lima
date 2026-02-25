import { Header } from "@/components/header";
import { isValidToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: { children: React.ReactNode }) {
  const token = (await cookies()).get("auth-token")?.value ?? null;
  if (!isValidToken(token)) redirect("/login");
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">{children}</main>
    </>
  );
}
