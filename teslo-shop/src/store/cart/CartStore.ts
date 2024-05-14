import type { CartProducts } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProducts[];
  addProductToCart: (product: CartProducts) => void;
  getTotalItems: () => number;
  //updateProductQuantity:
  //removeProduct:
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProducts) => {
        const { cart } = get();
        const productExitsInCard = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productExitsInCard) {
          set({ cart: [...cart, product] });
          return;
        }

        const updateCardProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size)
            return { ...item, quantity: item.quantity + product.quantity };

          return item;
        });

        set({ cart: updateCardProducts });
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
