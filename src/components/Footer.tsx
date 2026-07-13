import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[color:var(--cream)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-10">
        <div>
          <div className="font-display text-3xl font-semibold">Lumia<span className="text-[color:var(--gold)]">.</span></div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Botanical, dermatologist-tested skincare crafted for radiant, resilient skin.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social"
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-background">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Shop" links={[
          { label: "All Products", to: "/shop" as const },
          ...CATEGORIES.map((c) => ({ label: c.label, to: "/shop" as const, search: { category: c.id } })),
        ]}/>

        <FooterCol title="Help" links={[
          { label: "Shipping & Delivery", to: "/" as const },
          { label: "Returns", to: "/" as const },
          { label: "Contact Us", to: "/" as const },
          { label: "FAQ", to: "/" as const },
        ]}/>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wide uppercase">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Our Story</li>
            <li>Ingredients</li>
            <li>Sustainability</li>
            <li>Journal</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-10">
          <span>© {new Date().getFullYear()} Lumia Skincare. All rights reserved.</span>
          <span>Made with care in Algeria.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: any; search?: any }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold tracking-wide uppercase">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} search={l.search} className="hover:text-foreground transition-colors">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
