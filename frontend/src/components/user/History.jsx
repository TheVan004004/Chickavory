import React from "react";
import ProductPurchased from "../product/ProductPurchased";
import Pagination from "../Pagination";

export default function History() {
  return (
    <div className="flex flex-col gap-4 flex-grow-[3] p-4 shadow-md shadow-red-500/40 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-shadow duration-500">
      <div className="font-semibold text-3xl flex-shrink-0">
        Sản phẩm đã mua
      </div>
      <div className="flex-grow">
        <div className="w-full h-full overflow-y-auto flex flex-col gap-2">
          <ProductPurchased />
          <ProductPurchased />
          <ProductPurchased />
          <ProductPurchased />
        </div>
      </div>
      <Pagination count={4} />
    </div>
  );
}
