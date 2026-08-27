import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ClipboardList, PackagePlus, Archive } from "lucide-react";

const NAV = [
  { to: "/", label: "طلبية جديدة", icon: PackagePlus },
  { to: "/orders", label: "الطلبيات", icon: ClipboardList },
  { to: "/archive", label: "الأرشيف", icon: Archive },
] as const;

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-lg font-bold">إدارة الطلبيات</p>
            <p className="truncate text-xs text-muted-foreground">{title}</p>
          </div>
          <span className="shrink-0 rounded-full bg-[color:var(--cream)] px-3 py-1 text-xs text-muted-foreground">
            متجري
          </span>
        </div>
        <nav className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-3 pb-2">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-muted" }}
              className="flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">{children}</main>
      <footer className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        نظام بسيط لإدارة الطلبيات — تُحفظ البيانات في متصفحك
      </footer>
    </div>
  );
}
