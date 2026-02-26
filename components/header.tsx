"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tractor,
  LayoutDashboard,
  Handshake,
  TractorIcon,
  History,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { logoutAction } from "@/app/(private)/_actions/logoutAction";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user";
import { roleLabels } from "@/utils/user";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/emprestimos", label: "Empréstimos", icon: Handshake },
  { href: "/maquinas", label: "Máquinas", icon: TractorIcon },
  { href: "/historico", label: "Histórico", icon: History },
  // { href: "/gestao", label: "Gestão", icon: Users },
] as const;

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  className,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all",
        active
          ? "bg-primary/10 text-gray-900 font-semibold [&_svg]:text-primary"
          : "text-gray-600 hover:bg-gray-100",
        className
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { user, setUser } = useUserStore();

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3 md:gap-12">
              <div className="flex md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <Menu className="size-5 text-gray-700" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    showCloseButton={false}
                    className="w-[19rem] sm:max-w-[19rem] p-0 flex flex-col"
                  >
                    <SheetHeader className="flex flex-row items-center justify-between border-b border-gray-200 p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                          <Tractor className="size-5 text-white" />
                        </div>
                        <SheetTitle className="text-xl font-bold text-gray-900">
                          Machine Tracker
                        </SheetTitle>
                      </div>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-lg">
                          <span className="sr-only">Fechar</span>
                          <X className="size-4" />
                        </Button>
                      </SheetClose>
                    </SheetHeader>
                    <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                      <div>
                        <div className="font-semibold text-gray-900">{user?.name}</div>
                        <div className="text-sm text-gray-500">{roleLabels[user?.role ?? '']}</div>
                      </div>
                    </div>
                    <nav className="p-4 flex flex-col gap-1 flex-1">
                      {navItems.map(({ href, label, icon }) => (
                        <SheetClose asChild key={href}>
                          <NavLink
                            href={href}
                            label={label}
                            icon={icon}
                            active={pathname === href || (href !== "/" && pathname.startsWith(href))}
                          />
                        </SheetClose>
                      ))}
                    </nav>
                    <div className="p-4 border-t border-gray-200">
                      <form action={logoutAction} onSubmit={() => setUser(null)}>
                        <Button
                          type="submit"
                          variant="destructive"
                          className="w-full gap-2"
                        >
                          <LogOut className="size-4" />
                          Sair do Sistema
                        </Button>
                      </form>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <Link href="/" className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                  <Tractor className="size-4 md:size-5 text-white" />
                </div>
                <span className="text-lg md:text-2xl font-bold text-gray-900">
                  Machine Tracker
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map(({ href, label, icon }) => (
                  <NavLink
                    key={href}
                    href={href}
                    label={label}
                    icon={icon}
                    active={pathname === href || (href !== "/" && pathname.startsWith(href))}
                  />
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 bg-gray-50 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                  <span className="text-xs text-gray-500">{roleLabels[user?.role ?? '']}</span>
                </div>
              </div>
              <form action={logoutAction} onSubmit={() => setUser(null)}>
                <Button
                  type="submit"
                  variant="destructive"
                  size="default"
                  className="gap-2 hidden sm:inline-flex"
                >
                  <LogOut className="size-4" />
                  Sair
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  size="icon"
                  className="sm:hidden rounded-lg"
                >
                  <LogOut className="size-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 md:hidden">
        <div className="flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex-1 flex flex-col items-center py-2 px-1 text-xs transition-all",
                  active
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <Icon className="size-5 mb-1" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav> */}
    </>
  );
}
