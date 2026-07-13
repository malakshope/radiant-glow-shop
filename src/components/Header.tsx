import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Heart, Search, Menu, X, Moon, Sun, User } from "lucide-react";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useTheme } from "@/stores/theme";
import { CATEGORIES } from "@/data/products";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { itemCount } = useCart();
  const wishIds = useWishlist((s) => s.ids);
  const { mode, toggle, apply } = useTheme();

  useEffect(() => { apply(); setMounted(true); }, [apply]);

  const count = mounted ? itemCount() : 0;
  const wishCount = mounted ? wishIds.length : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-6 lg:gap-10 min-w-0">
          <button
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted lg:hidden shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          <Link to="/" className="font-display text-2xl font-semibold tracking-tight truncate">
            Lumia<span className="text-[color:var(--gold)]">.</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
            <Link to="/shop" className="hover:text-foreground transition-colors">All</Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to="/shop"
                search={{ category: c.id }}
                className="hover:text-foreground transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Link to="/shop" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Search">
            <Search size={18} />
          </Link>
          <button
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            aria-label="Toggle theme"
          >
            {mounted && mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/wishlist" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Wishlist">
            <Heart size={18} />
            {wishCount > 0 && <Badge>{wishCount}</Badge>}
          </Link>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Cart">
            <ShoppingBag size={18} />
            {count > 0 && <Badge>{count}</Badge>}
          </Link>
          <Link to="/admin" className="hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Admin">
            <User size={18} />
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden animate-fade-in">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm">
            <Link to="/shop" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-muted">All Products</Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to="/shop"
                search={{ category: c.id }}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-muted"
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[color:var(--gold)] px-1 text-[10px] font-semibold text-primary-foreground">
      {children}
    </span>
  );
}
