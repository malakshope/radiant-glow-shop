import { createFileRoute, notFound, useNavigate, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, relatedProducts } from "@/data/products";
import { formatDZD } from "@/lib/format";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";
import { useEffect, useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Star, Check } from "lucide-react";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Lumia` },
          { name: "description", content: loaderData.product.short },
          { property: "og:title", content: `${loaderData.product.name} — Lumia` },
          { property: "og:description", content: loaderData.product.short },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product — Lumia" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to shop</Link>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const wishToggle = useWishlist((s) => s.toggle);
  const wishIds = useWishlist((s) => s.ids);
  const [mounted, setMounted] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => setMounted(true), []);
  const wished = mounted && wishIds.includes(product.id);

  const gallery = product.gallery.length ? product.gallery : [product.image];

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const buyNow = () => { add(product, qty); navigate({ to: "/checkout" }); };

  const related = relatedProducts(product);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link><span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link><span>/</span>
          <Link to="/shop" search={{ category: product.category }} className="hover:text-foreground capitalize">{product.category.replace("-", " ")}</Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl bg-[color:var(--cream)]">
              <img src={gallery[activeImg]} alt={product.name} width={900} height={900} className="h-full w-full object-cover" />
            </div>
            <div className="flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition-colors ${activeImg === i ? "border-foreground" : "border-transparent"}`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star size={14} fill="currentColor" className="text-[color:var(--gold)]" />
              <span>{product.rating.toFixed(1)}</span>
              <span>· {product.reviewsCount} reviews</span>
            </div>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl">{product.name}</h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-medium">{formatDZD(product.price)}</span>
              {product.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatDZD(product.oldPrice)}</span>}
            </div>
            <p className="mt-5 text-muted-foreground">{product.description}</p>

            <div className="mt-6 space-y-4">
              <Row label="Skin type">
                <div className="flex flex-wrap gap-2">
                  {product.skinTypes.map((s) => <span key={s} className="chip capitalize">{s}</span>)}
                </div>
              </Row>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center" aria-label="Decrease">
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center" aria-label="Increase">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={handleAdd} className="btn-primary">
                {added ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to bag</>}
              </button>
              <button onClick={buyNow} className="btn-outline">Buy now</button>
              <button
                onClick={() => wishToggle(product.id)}
                aria-label="Wishlist"
                className={`grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-muted ${wished ? "text-[color:var(--destructive)]" : ""}`}
              >
                <Heart size={16} fill={wished ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-10 grid gap-5">
              <Panel title="Key ingredients">
                <ul className="grid grid-cols-2 gap-y-1.5 text-sm">
                  {product.ingredients.map((i) => <li key={i}>· {i}</li>)}
                </ul>
              </Panel>
              <Panel title="Benefits">
                <ul className="space-y-1.5 text-sm">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check size={14} className="mt-0.5 text-[color:var(--gold)]" /> {b}
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel title="How to use">
                <p className="text-sm text-muted-foreground">{product.howToUse}</p>
              </Panel>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="mb-8 font-display text-3xl sm:text-4xl">Customer reviews</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { n: "Lina H.", b: "Absolutely love this product — my skin feels so soft." },
              { n: "Nadia S.", b: "Beautiful texture and it works. I noticed a difference in a week." },
              { n: "Rania T.", b: "Elegant packaging, gentle, and effective. Will re-order." },
            ].map((r, i) => (
              <div key={i} className="surface-card p-6">
                <div className="mb-2 flex text-[color:var(--gold)]">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                </div>
                <p className="text-sm">"{r.b}"</p>
                <p className="mt-4 text-xs text-muted-foreground">— {r.n}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 font-display text-3xl sm:text-4xl">You may also love</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-24 text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}
