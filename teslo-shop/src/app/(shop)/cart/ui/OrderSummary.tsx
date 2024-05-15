"use client";
import { Spinner } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import React, { useEffect, useState } from "react";

export const OrderSummary = () => {
  const getSummaryInformation = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Spinner />;

  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {getSummaryInformation.itemsInCart} artículos
        </span>

        <span>Subtotal</span>
        <span className="text-right">
          {currencyFormat(getSummaryInformation.subTotal)}
        </span>

        <span>Impuestos (15%)</span>
        <span className="text-right">
          {currencyFormat(getSummaryInformation.iva)}
        </span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(getSummaryInformation.total)}
        </span>
      </div>
    </>
  );
};
