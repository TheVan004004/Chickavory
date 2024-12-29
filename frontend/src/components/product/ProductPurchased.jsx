import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
export default function ProductPurchased() {
  return (
    <div className="w-full h-[104px] flex gap-2 max-md:gap-4 justify-between items-center border-red-700 border-[1px] p-2 rounded-xl">
      <img className="h-full rounded-xl" src={"chicken"} alt="" />
      <div className="flex-grow flex flex-col justify-between">
        <div className=" font-medium text-ellipsis text-nowrap">
          Tên sản phẩm
        </div>
        <div className=" text-lg text-red-400 font-medium">99.000đ</div>
        <div className="w-24 py-1 bg-red-400 text-sm text-white font-medium text-center rounded-xl">
          Lượt mua: 10
        </div>
      </div>
      <button className="flex-shrink-0 size-20 text-sm bg-red-700 rounded-xl text-white font-semibold flex flex-col gap-1 justify-center items-center hover:text-yellow-400">
        <HiOutlineShoppingBag className="size-6" />
        Đặt hàng
      </button>
    </div>
  );
}
