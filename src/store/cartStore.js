import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const exists = state.items.find((i) => i.id === dish.id);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.id === dish.id ? { ...i, qty: i.qty + 1 } : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { id: dish.id, name: dish.nameEn, price: dish.priceETB, qty: 1 },
            ],
          };
        }),

      inc: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i,
          ),
        })),

      dec: (id) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "mesob-cart" },
  ),
);
