"use client";
import { QuatitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCard = () => {
    setPosted(true);
    if (!size) return;
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
