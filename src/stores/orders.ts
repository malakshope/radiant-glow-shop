import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus = "new" | "confirmed" | "archived";

export interface Order {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  product: string;
  color: string;
  size: string;
  status: OrderStatus;
  createdAt: number;
}

export interface OrderInput {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  product: string;
  color: string;
  size: string;
}

interface OrdersState {
  orders: Order[];
  add: (input: OrderInput) => void;
  confirm: (id: string) => void;
  archive: (id: string) => void;
  remove: (id: string) => void;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      add: (input) =>
        set((s) => ({
          orders: [
            {
              ...input,
              id:
                typeof crypto !== "undefined" && "randomUUID" in crypto
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random()}`,
              status: "new",
              createdAt: Date.now(),
            },
            ...s.orders,
          ],
        })),
      confirm: (id) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status: "confirmed" } : o)),
        })),
      archive: (id) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status: "archived" } : o)),
        })),
      remove: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
    }),
    { name: "orders-store-v1" },
  ),
);

export function matchesQuery(o: Order, q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return true;
  return (
    o.firstName.toLowerCase().includes(t) ||
    o.lastName.toLowerCase().includes(t) ||
    o.phone.replace(/\s/g, "").includes(t.replace(/\s/g, ""))
  );
}

export function formatDateTime(ts: number) {
  return new Intl.DateTimeFormat("ar-DZ", {
    dateStyle: "medium",
    timeStyle: "short",
    numberingSystem: "latn",
  }).format(new Date(ts));
}
