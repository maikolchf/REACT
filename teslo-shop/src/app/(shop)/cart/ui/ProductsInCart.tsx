"use client";

import { QuatitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>cargando...</p>;

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
            <Link 
            className="hover:underline cursor-pointer"
            href={`/product/${product.slug}`}>{product.title}</Link>
            <p>Talla: {product.size}</p>
            <p>${product.price}</p>
            <QuatitySelector
              quantity={3}
              inStock={product.inStock}
              onQuantityChanged={(value) => console.log(value)}
            />
            <button className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
