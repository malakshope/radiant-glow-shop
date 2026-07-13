import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Lock, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumia — Healthy Skin Starts Here" },
      { name: "description", content: "Radiant, hydrated, protected skin. Discover Lumia's botanical serums, creams, and sunscreens." },
      { property: "og:title", content: "Lumia — Healthy Skin Starts Here" },
      { property: "og:description", content: "Radiant, hydrated, protected skin. Botanical skincare crafted for you." },
    ],
  }),
  component: Home,
});

function Home() {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  return (
    <SiteLayout>
      <Hero />
      <Categories />
      <Section title="Best Sellers" subtitle="Loved by our community" cta={{ label: "Shop all", to: "/shop" }}>
        <Grid>{bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}</Grid>
      </Section>
      <Section title="New Arrivals" subtitle="Fresh from our lab" cta={{ label: "Explore new", to: "/shop" }}>
        <Grid>{newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}</Grid>
      </Section>
      <Benefits />
      <Reviews />
      <Newsletter />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--cream)]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-24">
        <div className="animate-fade-in">
          <span className="chip">
            <Sparkles size={12} /> Botanical · Dermatologist Tested
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Healthy Skin<br />
            <span className="italic text-[color:var(--gold)]">Starts Here.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
            Radiant, hydrated, and protected — everyday. Discover clinical botanical formulas
            crafted for a luminous complexion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
            <Link to="/shop" search={{ category: "serums" }} className="btn-outline">Explore serums</Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            <Stat n="120k+" l="Happy customers" />
            <Stat n="4.9★" l="Avg. rating" />
            <Stat n="58" l="Wilayas served" />
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-[color:var(--blush)] blur-2xl opacity-70" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-glow)]">
            <img
              src={heroImg}
              alt="Lumia luxury skincare arrangement of serums, creams and botanicals"
              width={1600}
              height={1100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:block">
            <div className="flex items-center gap-2 text-xs">
              <Star size={12} fill="currentColor" className="text-[color:var(--gold)]" />
              <span className="font-medium">Rated 4.9 / 5</span>
              <span className="text-muted-foreground">from 3,200 reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="font-display text-2xl">{n}</dt>
      <dd className="text-xs text-muted-foreground">{l}</dd>
    </div>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="chip">Categories</span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Shop by ritual</h2>
        </div>
        <Link to="/shop" className="hidden text-sm text-muted-foreground underline-offset-4 hover:underline sm:block">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((c, i) => (
          <Link
            key={c.id}
            to="/shop"
            search={{ category: c.id }}
            className="group relative overflow-hidden rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            style={{ background: `var(--${["blush","cream","sage","beige","blush"][i%5]})` }}
          >
            <div className="flex h-40 flex-col justify-between">
              <span className="font-display text-3xl leading-tight">{c.label}</span>
              <div>
                <p className="text-xs text-foreground/70">{c.blurb}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium">
                  Shop <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Section({ title, subtitle, cta, children }: { title: string; subtitle?: string; cta?: { label: string; to: string }; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          {subtitle && <span className="chip">{subtitle}</span>}
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h2>
        </div>
        {cta && <Link to={cta.to as any} className="hidden text-sm text-muted-foreground underline-offset-4 hover:underline sm:block">{cta.label} →</Link>}
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">{children}</div>;
}

function Benefits() {
  const items = [
    { icon: ShieldCheck, title: "Dermatologically Tested", body: "Formulated and tested by dermatology experts." },
    { icon: Truck, title: "Fast Delivery", body: "Ships across all 58 wilayas in 24–72h." },
    { icon: Lock, title: "Secure Payment", body: "Cash on delivery and secure online options." },
    { icon: Sparkles, title: "Premium Quality", body: "Clean, potent, botanical-first formulas." },
  ];
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-2 gap-3 rounded-3xl bg-[color:var(--cream)] p-6 sm:p-8 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-background shadow-[var(--shadow-soft)]">
              <it.icon size={20} className="text-[color:var(--gold)]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold">{it.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Amina B.", city: "Alger", rating: 5, body: "My skin has never looked so radiant. The Golden Serum is unreal." },
  { name: "Yasmine K.", city: "Oran", rating: 5, body: "The night cream is a dream — my skin drinks it up." },
  { name: "Sara M.", city: "Constantine", rating: 5, body: "Fast delivery, beautiful packaging, and truly effective products." },
];

function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-10 text-center">
        <span className="chip">Loved</span>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl">Skin stories from our community</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <div key={r.name} className="surface-card p-8">
            <div className="mb-3 flex text-[color:var(--gold)]">
              {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="font-display text-xl leading-snug">"{r.body}"</p>
            <div className="mt-6 text-sm text-muted-foreground">— {r.name}, {r.city}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl sm:text-5xl">Join the Lumia ritual</h2>
          <p className="mt-3 text-primary-foreground/70">
            Get 10% off your first order plus skincare tips from our experts.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setOk(true); }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-full bg-background/10 px-5 py-3 text-sm placeholder:text-primary-foreground/50 outline-none ring-1 ring-inset ring-primary-foreground/20 focus:ring-primary-foreground/60"
            />
            <button type="submit" className="rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5">
              {ok ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
