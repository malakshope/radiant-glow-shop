import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/stores/cart";
import { WILAYAS } from "@/data/wilayas";
import { formatDZD } from "@/lib/format";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Lumia" }, { name: "description", content: "Complete your Lumia order with cash on delivery across Algeria." }] }),
  component: CheckoutPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(/^(0|\+213)[5-7]\d{8}$/, "Enter a valid Algerian phone number"),
  wilaya: z.string().min(1, "Please select a wilaya"),
  address: z.string().trim().min(5, "Please enter a full address").max(300),
  notes: z.string().max(500).optional(),
});

function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", wilaya: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { items, subtotal, discount, coupon, clear } = useCart();
  useEffect(() => setMounted(true), []);

  const wilayaObj = useMemo(() => WILAYAS.find((w) => w.name === form.wilaya), [form.wilaya]);
  const sub = mounted ? subtotal() : 0;
  const disc = mounted ? discount() : 0;
  const shipping = wilayaObj?.deliveryDZD ?? (sub > 0 ? 600 : 0);
  const total = Math.max(0, sub - disc) + shipping;

  if (mounted && items.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="font-display text-4xl">Your bag is empty</h1>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">Shop now</Link>
        </div>
      </SiteLayout>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (fe[i.path[0] as string] = i.message));
      setErrors(fe);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const orderId = `LUM-${Date.now().toString().slice(-6)}`;
    setTimeout(() => {
      clear();
      navigate({ to: "/order-confirmation", search: { id: orderId } });
    }, 700);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-10">
        <h1 className="font-display text-4xl sm:text-5xl">Checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">Cash on delivery available in all 58 wilayas.</p>

        <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <Field label="Full name" error={errors.fullName}>
              <input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="input"
                placeholder="Amina Benali"
              />
            </Field>
            <Field label="Phone number" error={errors.phone}>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input"
                placeholder="0555 12 34 56"
              />
            </Field>
            <Field label="Wilaya" error={errors.wilaya}>
              <select
                value={form.wilaya}
                onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
                className="input"
              >
                <option value="">Select your wilaya…</option>
                {WILAYAS.map((w) => (
                  <option key={w.code} value={w.name}>
                    {String(w.code).padStart(2, "0")} — {w.name} · {formatDZD(w.deliveryDZD)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Address" error={errors.address}>
              <textarea
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input"
                placeholder="Street, city, postal code"
              />
            </Field>
            <Field label="Notes (optional)">
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="input"
                placeholder="Delivery instructions…"
              />
            </Field>
          </div>

          <aside className="h-fit rounded-3xl bg-[color:var(--cream)] p-6 sm:p-8">
            <h2 className="font-display text-2xl">Order summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((i) => (
                <li key={i.productId} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-background">
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{i.qty}</span>
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-2">
                    <span className="line-clamp-2">{i.name}</span>
                    <span>{formatDZD(i.price * i.qty)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="my-4 h-px bg-border/70" />
            <dl className="space-y-1.5 text-sm">
              <Row label="Subtotal" value={formatDZD(sub)} />
              {disc > 0 && <Row label={`Discount${coupon ? ` (${coupon})` : ""}`} value={`- ${formatDZD(disc)}`} accent />}
              <Row label="Delivery" value={wilayaObj ? formatDZD(shipping) : "Select wilaya"} />
              <div className="my-2 h-px bg-border/70" />
              <Row label="Total" value={formatDZD(total)} strong />
            </dl>
            <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
              {submitting ? "Confirming…" : <>Confirm order <Check size={16} /></>}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Payment on delivery. No card required.</p>
          </aside>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid var(--color-border);
          background: var(--color-card);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          outline: none;
          transition: border-color .2s ease;
        }
        .input:focus { border-color: var(--color-foreground); }
      `}</style>
    </SiteLayout>
  );
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Row({ label, value, strong, accent }: { label: string; value: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-base font-semibold" : ""} ${accent ? "text-[color:var(--sage)]" : ""}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
