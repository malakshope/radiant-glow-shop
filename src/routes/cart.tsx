import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/stores/cart";
import { formatDZD } from "@/lib/format";
import { Minus, Plus, Trash2, ShoppingBag, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — Lumia" }, { name: "description", content: "Review your Lumia skincare selections and check out." }] }),
  component: CartPage,
});

function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const { items, setQty, remove, subtotal, discount, coupon, applyCoupon, removeCoupon } = useCart();
  useEffect(() => setMounted(true), []);

  if (!mounted) return <SiteLayout><div className="min-h-[50vh]" /></SiteLayout>;

  const sub = subtotal();
  const disc = discount();
  const shipping = sub > 0 ? 600 : 0;
  const total = Math.max(0, sub - disc) + shipping;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <h1 className="font-display text-4xl sm:text-5xl">Your bag</h1>
        <p className="mt-2 text-sm text-muted-foreground">{items.length} item{items.length !== 1 && "s"}</p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-[color:var(--cream)] p-16 text-center">
            <ShoppingBag className="mx-auto text-muted-foreground" size={40} />
            <p className="mt-4 font-display text-2xl">Your bag is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Discover our botanical rituals.</p>
            <Link to="/shop" className="btn-primary mt-6 inline-flex">Start shopping</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.productId} className="flex gap-4 rounded-3xl border border-border p-4 sm:p-5">
                  <Link to="/product/$slug" params={{ slug: i.slug }} className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[color:var(--cream)] sm:h-28 sm:w-28">
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link to="/product/$slug" params={{ slug: i.slug }} className="font-display text-lg truncate block hover:underline">{i.name}</Link>
                        <p className="mt-1 text-sm text-muted-foreground">{formatDZD(i.price)}</p>
                      </div>
                      <button onClick={() => remove(i.productId)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted" aria-label="Remove">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button onClick={() => setQty(i.productId, i.qty - 1)} className="grid h-9 w-9 place-items-center" aria-label="Decrease"><Minus size={13} /></button>
                        <span className="w-7 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.productId, i.qty + 1)} className="grid h-9 w-9 place-items-center" aria-label="Increase"><Plus size={13} /></button>
                      </div>
                      <span className="font-medium">{formatDZD(i.price * i.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-3xl bg-[color:var(--cream)] p-6 sm:p-8">
              <h2 className="font-display text-2xl">Order summary</h2>

              <div className="mt-6">
                {coupon ? (
                  <div className="flex items-center justify-between rounded-full bg-background px-4 py-2 text-sm">
                    <span className="flex items-center gap-2"><Tag size={14} /> {coupon}</span>
                    <button onClick={removeCoupon} aria-label="Remove coupon"><X size={14} /></button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const r = applyCoupon(couponInput);
                      setMsg({ ok: r.ok, text: r.message });
                      setCouponInput("");
                    }}
                    className="flex gap-2"
                  >
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-foreground"
                    />
                    <button className="btn-outline">Apply</button>
                  </form>
                )}
                {msg && <p className={`mt-2 text-xs ${msg.ok ? "text-[color:var(--sage)]" : "text-destructive"}`}>{msg.text}</p>}
                <p className="mt-2 text-xs text-muted-foreground">Try GLOW10, RADIANT15, WELCOME5</p>
              </div>

              <dl className="mt-6 space-y-2 text-sm">
                <SumRow label="Subtotal" value={formatDZD(sub)} />
                {disc > 0 && <SumRow label="Discount" value={`- ${formatDZD(disc)}`} accent />}
                <SumRow label="Delivery (est.)" value={formatDZD(shipping)} />
                <div className="my-3 h-px bg-border" />
                <SumRow label="Total" value={formatDZD(total)} strong />
              </dl>

              <Link to="/checkout" className="btn-primary mt-6 w-full">Checkout</Link>
              <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground underline-offset-4 hover:underline">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

function SumRow({ label, value, strong, accent }: { label: string; value: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-base font-semibold" : ""} ${accent ? "text-[color:var(--sage)]" : ""}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
