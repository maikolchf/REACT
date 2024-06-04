"use client";

import {  Spinner } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Spinner/>

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <span>
              {product.title}
            </span>
            <p>Cantidad: {product.quantity}</p>
            <p>Talla: {product.size}</p>
            <p>{currencyFormat(product.price * product.quantity)}</p>            
          </div>
        </div>
      ))}
    </>
  );
};
