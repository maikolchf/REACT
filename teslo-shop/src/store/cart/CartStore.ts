import type { CartProducts, Cart } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProducts[];
  addProductToCart: (product: CartProducts) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProducts, quantity: number) => void;
  removeProduct: (product: CartProducts) => void;
  getSummaryInformation: () => Cart;
  clearCart: () => void;
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
      updateProductQuantity: (product: CartProducts, quantity: number) => {
        const { cart } = get();

        const updateProductInCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size)
            return { ...item, quantity: quantity };

          return item;
        });

        set({ cart: updateProductInCart });
      },
      removeProduct: (product: CartProducts) => {
        const { cart } = get();

        const filterProductInCart = cart.filter((item) => {
          if (item.id !== product.id || item.size !== product.size)
            return { ...item };
        });

        set({ cart: filterProductInCart });
      },
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const iva = subTotal * 0.15;
        const total = subTotal + iva;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          iva,
          total,
          itemsInCart
        }
      },
      clearCart: () => {
        set({ cart: [] })
      }
    }),
    {
      name: "shopping-cart",
    }
  )
);
