import { titleFonts } from "@/config/fonts";
import React from "react";

export const Spinner = () => {
  return (
    <h1 className={` ${titleFonts.className} antialiased font-bold text-lg flex items-center justify-center`}>
      <div className="border-gray-300 h-7 w-7 animate-spin rounded-full border-8 border-t-gray-600" />
    </h1>
  );
};
