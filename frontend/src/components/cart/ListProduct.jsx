import React from "react";
import ProductInCart from "../product/ProductInCart";

export default function ListProduct() {
  return (
    <div className="flex-grow-[2] p-4 shadow-md shadow-red-500/40 rounded-xl">
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
          <ProductInCart />
          <ProductInCart />
          <ProductInCart />
          <ProductInCart />
        </div>
      </div>
    </div>
  );
}
