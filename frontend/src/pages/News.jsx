import React, { useEffect, useState } from "react";
import Advertises from "../components/news/Advertises";
import ProductDiscountTime from "../components/product/ProductDiscountTime";
import { getTopDiscountAPI } from "../services/product.api";

export default function News() {
  const [listTopDiscount, setListTopDiscount] = useState([]);
  useEffect(() => {
    getTopDiscount();
  }, []);
  const getTopDiscount = async () => {
    const res = await getTopDiscountAPI();
    setListTopDiscount(res.data);
  };
  const month = new Date().getMonth();
  return (
    <div className="pt-20 flex gap-4 flex-col">
      <Advertises />
      <div className="mx-12 w-44 h-[2px] bg-red-600"></div>
      <div className="px-12 font-semibold text-2xl">Hot Deals {month + 1}:</div>
      <div className=" pb-8 px-12 grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-8 gap-y-12">
        {listTopDiscount.map((product, index) => {
          return <ProductDiscountTime key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
