import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (s: Record<string, unknown>) => ({ id: typeof s.id === "string" ? s.id : "" }),
  head: () => ({ meta: [{ title: "Order confirmed — Lumia" }, { name: "robots", content: "noindex" }] }),
  component: () => {
    const { id } = Route.useSearch();
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <CheckCircle2 size={56} className="mx-auto text-[color:var(--sage)]" />
          <h1 className="mt-6 font-display text-4xl sm:text-5xl">Thank you</h1>
          <p className="mt-3 text-muted-foreground">
            Your order has been received. Our team will call you shortly to confirm delivery.
          </p>
          {id && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--cream)] px-5 py-2 text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-semibold">{id}</span>
            </div>
          )}
          <div className="mt-10">
            <Link to="/shop" className="btn-primary">Continue shopping</Link>
          </div>
        </div>
      </SiteLayout>
    );
  },
});
