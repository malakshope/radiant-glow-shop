import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Archive as ArchiveIcon, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatsBar } from "@/components/StatsBar";
import { OrderCard } from "@/components/OrderCard";
import { matchesQuery, useOrders } from "@/stores/orders";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "الأرشيف — إدارة طلبيات المتجر" },
      { name: "description", content: "الطلبيات المؤرشفة مع إمكانية الحذف النهائي بعد التأكيد." },
      { property: "og:title", content: "الأرشيف — إدارة طلبيات المتجر" },
      { property: "og:description", content: "راجع الطلبيات المؤرشفة واحذفها نهائيًا عند الحاجة." },
    ],
  }),
  component: ArchivePage,
});

function ArchivePage() {
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const { orders, remove } = useOrders();
  useEffect(() => setMounted(true), []);

  const list = useMemo(
    () =>
      orders
        .filter((o) => o.status === "archived")
        .filter((o) => matchesQuery(o, q))
        .sort((a, b) => b.createdAt - a.createdAt),
    [orders, q],
  );

  return (
    <AppShell title="الطلبيات المؤرشفة">
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
        <div className="mt-6 rounded-3xl bg-[color:var(--cream)] p-12 text-center">
          <ArchiveIcon className="mx-auto text-muted-foreground" size={36} />
          <p className="mt-3 font-semibold">الأرشيف فارغ</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {list.map((o) => (
            <OrderCard key={o.id} order={o} onDelete={() => setPendingId(o.id)} />
          ))}
        </ul>
      )}

      {pendingId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm">
          <div className="surface-card w-full max-w-sm border border-border p-6 text-center">
            <AlertTriangle className="mx-auto text-destructive" size={32} />
            <p className="mt-3 font-bold">هل أنت متأكد؟</p>
            <p className="mt-1 text-sm text-muted-foreground">لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  remove(pendingId);
                  setPendingId(null);
                }}
                className="flex-1 rounded-full bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground"
              >
                حذف نهائي
              </button>
              <button onClick={() => setPendingId(null)} className="btn-outline flex-1 px-4 py-2.5 text-sm">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
