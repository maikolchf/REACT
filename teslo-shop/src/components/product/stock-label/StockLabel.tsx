"use client";
import { getStockBySlug } from "@/actions";
import { titleFonts } from "@/config/fonts";
import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getStock();
  }, []);
  const getStock = async () => {
    const stock = await getStockBySlug(slug);
    setStock(stock);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFonts.className} antialiased font-bold text-lg`}
        >
          <div className="border-gray-300 h-7 w-7 animate-spin rounded-full border-8 border-t-gray-600" />
        </h1>
      ) : (
        <h1
          className={` ${titleFonts.className} antialiased font-bold text-lg`}
        >
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
