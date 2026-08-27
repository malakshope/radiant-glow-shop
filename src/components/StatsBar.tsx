import { useEffect, useState } from "react";
import { useOrders } from "@/stores/orders";

export function StatsBar() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrders((s) => s.orders);
  useEffect(() => setMounted(true), []);

  const c = (k: string) => (mounted ? orders.filter((o) => o.status === k).length : 0);

  return (
    <div className="grid grid-cols-3 gap-2">
      <Stat label="جديدة" value={c("new")} tone="bg-[color:var(--cream)]" />
      <Stat label="مؤكدة" value={c("confirmed")} tone="bg-[color:var(--sage)]/30" />
      <Stat label="مؤرشفة" value={c("archived")} tone="bg-[color:var(--beige)]/60" />
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className={`rounded-2xl ${tone} px-3 py-3 text-center`}>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
