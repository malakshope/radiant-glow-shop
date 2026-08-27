import { CheckCircle2, Archive, Trash2, Phone, MapPin, Palette, Ruler, Package, Clock } from "lucide-react";
import { formatDateTime, type Order } from "@/stores/orders";

export function OrderCard({
  order,
  onConfirm,
  onArchive,
  onDelete,
}: {
  order: Order;
  onConfirm?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}) {
  const confirmed = order.status !== "new";
  return (
    <li
      className={`surface-card border p-4 transition-colors ${
        order.status === "confirmed"
          ? "border-[color:var(--sage)] bg-[color:var(--sage)]/15"
          : "border-border"
      }`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold">
            {order.firstName} {order.lastName}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={12} className="shrink-0" />
            {formatDateTime(order.createdAt)}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            order.status === "new"
              ? "bg-muted text-muted-foreground"
              : order.status === "confirmed"
                ? "bg-[color:var(--sage)] text-foreground"
                : "bg-[color:var(--beige)] text-foreground"
          }`}
        >
          {order.status === "new" ? "جديدة" : order.status === "confirmed" ? "مؤكدة 🟢" : "مؤرشفة"}
        </span>
      </div>

      <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <Row icon={<Phone size={14} />} label="الهاتف" value={order.phone} dir="ltr" />
        <Row icon={<MapPin size={14} />} label="العنوان" value={order.address} />
        <Row icon={<Package size={14} />} label="الطلب" value={order.product} />
        <Row icon={<Palette size={14} />} label="اللون" value={order.color || "—"} />
        <Row icon={<Ruler size={14} />} label="الحجم" value={order.size || "—"} />
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {!confirmed && onConfirm && (
          <button onClick={onConfirm} className="btn-primary px-4 py-2 text-sm">
            <CheckCircle2 size={16} /> تأكيد
          </button>
        )}
        {order.status === "confirmed" && onArchive && (
          <button onClick={onArchive} className="btn-outline px-4 py-2 text-sm">
            <Archive size={16} /> أرشفة
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <Trash2 size={16} /> حذف نهائي
          </button>
        )}
      </div>
    </li>
  );
}

function Row({
  icon,
  label,
  value,
  dir,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  dir?: "ltr";
}) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <span className="mt-0.5 shrink-0 text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[11px] text-muted-foreground">{label}</dt>
        <dd className="break-words font-medium" dir={dir}>
          {value}
        </dd>
      </div>
    </div>
  );
}
