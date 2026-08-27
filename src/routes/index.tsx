import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { StatsBar } from "@/components/StatsBar";
import { useOrders, type OrderInput } from "@/stores/orders";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "طلبية جديدة — إدارة طلبيات المتجر" },
      { name: "description", content: "أضف طلبية جديدة بسرعة: الاسم، اللقب، الهاتف، العنوان، المنتج، اللون والحجم." },
      { property: "og:title", content: "طلبية جديدة — إدارة طلبيات المتجر" },
      { property: "og:description", content: "نظام عربي بسيط لتسجيل وإدارة طلبيات المتجر." },
    ],
  }),
  component: NewOrderPage,
});

const EMPTY: OrderInput = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  product: "",
  color: "",
  size: "",
};

function NewOrderPage() {
  const [form, setForm] = useState<OrderInput>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const add = useOrders((s) => s.add);

  const set = (k: keyof OrderInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.firstName.trim().length < 2) err.firstName = "أدخل الاسم";
    if (form.lastName.trim().length < 2) err.lastName = "أدخل اللقب";
    if (!/^[0-9+\s]{8,15}$/.test(form.phone.trim())) err.phone = "أدخل رقم هاتف صحيح";
    if (form.address.trim().length < 4) err.address = "أدخل العنوان";
    if (form.product.trim().length < 2) err.product = "أدخل الطلب / المنتج";
    setErrors(err);
    if (Object.keys(err).length) return;

    add({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      product: form.product.trim(),
      color: form.color.trim(),
      size: form.size.trim(),
    });
    setForm(EMPTY);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppShell title="تسجيل طلبية جديدة">
      <StatsBar />

      <form onSubmit={submit} className="surface-card mt-5 border border-border p-5">
        <h1 className="text-xl font-bold">طلبية جديدة</h1>
        <p className="mt-1 text-sm text-muted-foreground">املأ المعلومات ثم اضغط تأكيد الطلب.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="الاسم" error={errors.firstName}>
            <input className="fld" value={form.firstName} onChange={set("firstName")} placeholder="محمد" />
          </Field>
          <Field label="اللقب" error={errors.lastName}>
            <input className="fld" value={form.lastName} onChange={set("lastName")} placeholder="بن علي" />
          </Field>
          <Field label="رقم الهاتف" error={errors.phone}>
            <input className="fld" dir="ltr" inputMode="tel" value={form.phone} onChange={set("phone")} placeholder="0555123456" />
          </Field>
          <Field label="الطلب / المنتج" error={errors.product}>
            <input className="fld" value={form.product} onChange={set("product")} placeholder="قميص قطني" />
          </Field>
          <Field label="اللون">
            <input className="fld" value={form.color} onChange={set("color")} placeholder="أسود" />
          </Field>
          <Field label="الحجم">
            <input className="fld" value={form.size} onChange={set("size")} placeholder="L" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="العنوان" error={errors.address}>
              <textarea className="fld" rows={2} value={form.address} onChange={set("address")} placeholder="الحي، البلدية، الولاية" />
            </Field>
          </div>
        </div>

        <button type="submit" className="btn-primary mt-5 w-full">
          <CheckCircle2 size={18} /> تأكيد الطلب
        </button>

        {saved && (
          <p className="mt-3 rounded-2xl bg-[color:var(--sage)]/25 px-4 py-2 text-center text-sm font-medium">
            تم حفظ الطلبية بنجاح ✅
          </p>
        )}
      </form>
    </AppShell>
  );
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
