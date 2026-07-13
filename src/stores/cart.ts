import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  coupon: string | null;
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  subtotal: () => number;
  discount: () => number;
  itemCount: () => number;
}

const COUPONS: Record<string, number> = {
  GLOW10: 0.1,
  RADIANT15: 0.15,
  WELCOME5: 0.05,
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      add: (p, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === p.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === p.id ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return {
            items: [
              ...s.items,
              { productId: p.id, slug: p.slug, name: p.name, price: p.price, image: p.image, qty },
            ],
          };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.productId !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.productId === id ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [], coupon: null }),
      applyCoupon: (code) => {
        const key = code.trim().toUpperCase();
        if (!(key in COUPONS)) return { ok: false, message: "Invalid coupon code." };
        set({ coupon: key });
        return { ok: true, message: `Coupon applied: ${Math.round(COUPONS[key] * 100)}% off` };
      },
      removeCoupon: () => set({ coupon: null }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
      discount: () => {
        const c = get().coupon;
        if (!c) return 0;
        return Math.round(get().subtotal() * (COUPONS[c] ?? 0));
      },
      itemCount: () => get().items.reduce((s, i) => s + i.qty, 0),
    }),
    { name: "lumia-cart" },
  ),
);
