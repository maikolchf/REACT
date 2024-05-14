"use client";
import { QuatitySelector, SizeSelector } from "@/components";
import type { CartProducts, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCard = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct:CartProducts = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
      inStock: product.inStock
    }

    addProductToCart(cartProduct);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-600 ">
          Debe de seleccionar una talla
        </span>
      )}

      {/* Selector de tallas */}

      <SizeSelector
        selectdSize={size}
        availableSize={product.sizes}
        onSizeSelecter={setSize}
      />

      {/* Cantidades */}
      <QuatitySelector
        quantity={quantity}
        inStock={product.inStock}
        onQuantityChanged={setQuantity}
      />

      <button 
      className="btn-primary my-5"
      onClick={() => addToCard()}
      >Agregar al carrito</button>
    </>
  );
};
