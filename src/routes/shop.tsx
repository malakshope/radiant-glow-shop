import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category, type SkinType } from "@/data/products";
import { Search, X } from "lucide-react";
import { useMemo } from "react";

interface ShopSearch {
  category?: Category;
  skin?: SkinType;
  q?: string;
  sort?: "popular" | "price-asc" | "price-desc" | "new";
}

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — Lumia Skincare" },
      { name: "description", content: "Browse Lumia serums, creams, moisturizers, cleansers and sunscreens. Filter by skin type." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    category: (s.category as Category) || undefined,
    skin: (s.skin as SkinType) || undefined,
    q: typeof s.q === "string" ? s.q : undefined,
    sort: (s.sort as ShopSearch["sort"]) || undefined,
  }),
  component: Shop,
});

const SKIN_TYPES: { id: SkinType; label: string }[] = [
  { id: "oily", label: "Oily" },
  { id: "dry", label: "Dry" },
  { id: "combination", label: "Combination" },
  { id: "sensitive", label: "Sensitive" },
];

function Shop() {
  const { category, skin, q, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const setSearch = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev: ShopSearch) => ({ ...prev, ...patch }) });

  const products = useMemo(() => {
    let list = PRODUCTS.slice();
    if (category) list = list.filter((p) => p.category === category);
    if (skin) list = list.filter((p) => p.skinTypes.includes(skin));
    if (q) {
      const query = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(query) || p.short.toLowerCase().includes(query),
      );
    }
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "new": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
      default: list.sort((a, b) => Number(!!b.isBestSeller) - Number(!!a.isBestSeller));
    }
    return list;
  }, [category, skin, q, sort]);

  const activeCat = CATEGORIES.find((c) => c.id === category);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-[color:var(--cream)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
          <span className="chip">{activeCat?.label ?? "All products"}</span>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">
            {activeCat ? activeCat.label : "Every ritual, curated."}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {activeCat?.blurb ?? "Explore our full collection of botanical, dermatologist-tested skincare."}
          </p>

          <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-background px-4 py-2 max-w-md">
            <Search size={16} className="text-muted-foreground" />
            <input
              value={q ?? ""}
              onChange={(e) => setSearch({ q: e.target.value || undefined })}
              placeholder="Search products, ingredients…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {q && (
              <button onClick={() => setSearch({ q: undefined })} aria-label="Clear">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-10">
        <aside className="space-y-8">
          <FilterGroup title="Category">
            <FilterChip active={!category} onClick={() => setSearch({ category: undefined })}>All</FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c.id}
                active={category === c.id}
                onClick={() => setSearch({ category: category === c.id ? undefined : c.id })}
              >
                {c.label}
              </FilterChip>
            ))}
          </FilterGroup>
          <FilterGroup title="Skin type">
            <FilterChip active={!skin} onClick={() => setSearch({ skin: undefined })}>All</FilterChip>
            {SKIN_TYPES.map((s) => (
              <FilterChip
                key={s.id}
                active={skin === s.id}
                onClick={() => setSearch({ skin: skin === s.id ? undefined : s.id })}
              >
                {s.label}
              </FilterChip>
            ))}
          </FilterGroup>
          <FilterGroup title="Sort">
            {[
              { id: "popular", label: "Most popular" },
              { id: "new", label: "New arrivals" },
              { id: "price-asc", label: "Price: low to high" },
              { id: "price-desc", label: "Price: high to low" },
            ].map((o) => (
              <FilterChip
                key={o.id}
                active={(sort ?? "popular") === o.id}
                onClick={() => setSearch({ sort: o.id as ShopSearch["sort"] })}
              >
                {o.label}
              </FilterChip>
            ))}
          </FilterGroup>
        </aside>

        <div>
          <div className="mb-6 text-sm text-muted-foreground">{products.length} products</div>
          {products.length === 0 ? (
            <div className="rounded-3xl border border-border bg-[color:var(--cream)] p-10 text-center">
              <p className="font-display text-2xl">No matches</p>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
