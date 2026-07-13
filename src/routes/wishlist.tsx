import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useWishlist } from "@/stores/wishlist";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Lumia" }, { name: "robots", content: "noindex" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const ids = useWishlist((s) => s.ids);
  useEffect(() => setMounted(true), []);
  const products = mounted ? PRODUCTS.filter((p) => ids.includes(p.id)) : [];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <h1 className="font-display text-4xl sm:text-5xl">Your wishlist</h1>
        <p className="mt-2 text-sm text-muted-foreground">Saved rituals to revisit.</p>

        {mounted && products.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-[color:var(--cream)] p-16 text-center">
            <Heart className="mx-auto text-muted-foreground" size={40} />
            <p className="mt-4 font-display text-2xl">Nothing saved yet</p>
            <Link to="/shop" className="btn-primary mt-6 inline-flex">Explore products</Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
