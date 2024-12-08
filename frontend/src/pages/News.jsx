import React from "react";
import Advertises from "../components/news/Advertises";
import ProductDiscountTime from "../components/product/ProductDiscountTime";

export default function News() {
  const month = new Date().getMonth();
  return (
    <div className="pt-20 flex gap-4 flex-col">
      <Advertises />
      <div className="mx-12 w-44 h-[2px] bg-red-600"></div>
      <div className="px-12 font-semibold text-2xl">
        Ưu đãi tháng {month + 1}:
      </div>
      <div className=" pb-8 px-12 grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-4 gap-y-8">
        <ProductDiscountTime />
        <ProductDiscountTime />
        <ProductDiscountTime />
        <ProductDiscountTime />
        <ProductDiscountTime />
      </div>
    </div>
  );
}
