import { create } from "zustand";

export const useOrderStore = create((set) => ({
  lastOrder: null,

  placeOrder: (order) => set({ lastOrder: order }),
  clearOrder: () => set({ lastOrder: null }),
}));
