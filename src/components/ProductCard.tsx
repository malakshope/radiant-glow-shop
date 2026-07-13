import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatDZD } from "@/lib/format";
import { useWishlist } from "@/stores/wishlist";
import { useCart } from "@/stores/cart";
import { useEffect, useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const [mounted, setMounted] = useState(false);
  const wishToggle = useWishlist((s) => s.toggle);
  const wishIds = useWishlist((s) => s.ids);
  const add = useCart((s) => s.add);
  useEffect(() => setMounted(true), []);
  const wished = mounted && wishIds.includes(product.id);

  return (
    <div className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden rounded-3xl bg-[color:var(--cream)]"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={900}
            height={900}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isBestSeller && <span className="chip bg-[color:var(--gold)]/90 text-primary-foreground">Best Seller</span>}
            {product.isNew && <span className="chip bg-[color:var(--sage)] text-foreground">New</span>}
            {product.oldPrice && <span className="chip bg-[color:var(--blush)] text-foreground">Sale</span>}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); wishToggle(product.id); }}
            aria-label="Add to wishlist"
            className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-background/90 backdrop-blur transition-colors hover:bg-background ${wished ? "text-[color:var(--destructive)]" : ""}`}
          >
            <Heart size={16} fill={wished ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); add(product); }}
            className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0"
          >
            <ShoppingBag size={14} /> Add to bag
          </button>
        </div>
      </Link>

      <div className="px-1 pt-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star size={12} fill="currentColor" className="text-[color:var(--gold)]" />
          <span>{product.rating.toFixed(1)}</span>
          <span>· {product.reviewsCount} reviews</span>
        </div>
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="mt-1 font-display text-lg font-medium">{product.name}</h3>
        </Link>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{product.short}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-medium">{formatDZD(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatDZD(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
