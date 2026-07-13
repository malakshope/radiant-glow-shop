import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Lumia" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <Lock size={40} className="mx-auto text-muted-foreground" />
        <h1 className="mt-6 font-display text-4xl">Admin dashboard</h1>
        <p className="mt-3 text-muted-foreground">
          Coming in the next stage: real products, orders, customers, statistics, and secure admin login.
          The next step is enabling Lovable Cloud to power the database, auth, and admin.
        </p>
        <Link to="/" className="btn-outline mt-6 inline-flex">Back home</Link>
      </div>
    </SiteLayout>
  ),
});
