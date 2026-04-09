import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, variants: Record<string, string>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity, variants) => {
        const { items } = get();
        const variantKey = Object.values(variants).sort().join("-");
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && Object.values(item.selectedVariants).sort().join("-") === variantKey
        );

        if (existingIndex >= 0) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
            totalPrice: (updated[existingIndex].quantity + quantity) * product.price,
          };
          set({ items: updated });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${variantKey || Date.now()}`,
            product,
            quantity,
            selectedVariants: variants,
            totalPrice: quantity * product.price,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((item) =>
            item.id === id
              ? { ...item, quantity, totalPrice: quantity * item.product.price }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => get().items.reduce((sum, item) => sum + item.totalPrice, 0),

      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "launchpad-cart" }
  )
);
