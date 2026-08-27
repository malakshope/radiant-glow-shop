import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatsBar } from "@/components/StatsBar";
import { OrderCard } from "@/components/OrderCard";
import { matchesQuery, useOrders } from "@/stores/orders";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "الطلبيات — إدارة طلبيات المتجر" },
      { name: "description", content: "كل الطلبيات من الأحدث إلى الأقدم مع التأكيد والأرشفة والبحث." },
      { property: "og:title", content: "الطلبيات — إدارة طلبيات المتجر" },
      { property: "og:description", content: "تابع طلبياتك، أكّدها وأرشفها بسهولة." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const { orders, confirm, archive } = useOrders();
  useEffect(() => setMounted(true), []);

  const list = useMemo(
    () =>
      orders
        .filter((o) => o.status !== "archived")
        .filter((o) => matchesQuery(o, q))
        .sort((a, b) => b.createdAt - a.createdAt),
    [orders, q],
  );

  return (
    <AppShell title="كل الطلبيات">
      <StatsBar />

      <div className="relative mt-5">
        <Search size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث بالاسم أو اللقب أو رقم الهاتف…"
          className="fld pr-10"
        />
      </div>

      {!mounted ? (
        <div className="min-h-[30vh]" />
      ) : list.length === 0 ? (
        <Empty />
      ) : (
        <ul className="mt-4 space-y-3">
          {list.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              onConfirm={() => confirm(o.id)}
              onArchive={() => archive(o.id)}
            />
          ))}
        </ul>
      )}
    </AppShell>
  );
}

function Empty() {
  return (
    <div className="mt-6 rounded-3xl bg-[color:var(--cream)] p-12 text-center">
      <ClipboardList className="mx-auto text-muted-foreground" size={36} />
      <p className="mt-3 font-semibold">لا توجد طلبيات</p>
      <p className="mt-1 text-sm text-muted-foreground">أضف طلبية جديدة من الصفحة الرئيسية.</p>
    </div>
  );
}
