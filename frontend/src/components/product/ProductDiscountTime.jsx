import React from "react";
import chicken from "../../assets/chicken.png";
import { HiOutlineTag, HiOutlinePlusSm } from "react-icons/hi";
import CountDownTime from "../CountDown";
export default function ProductDiscountTime() {
  return (
    <div className="relative rounded-2xl  h-auto shadow-md shadow-red-400/50 hover:shadow-lg hover:shadow-red-400/50 transition-all duration-1000">
      <div className="p-4">
        <CountDownTime />
      </div>

      <div className=" bg-red-100">
        <img className="w-full h-auto " src={chicken} alt="" />
      </div>
      <div className="p-4 bg-red-900 rounded-b-2xl">
        <div className="text-white font-medium text-xl max-sm:text-2xl max-sm:pb-2">
          Tên sản phẩm
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <p className="text-yellow-400 font-semibold text-3xl max-sm:text-4xl">
              99.000đ
            </p>
            <div className="flex gap-2 items-center">
              <HiOutlineTag className="rotate-90 text-yellow-400 size-5" />
              <del className="text-gray-200/50">100.000đ</del>
            </div>
          </div>
          <div className="bg-yellow-400 rounded-xl size-14 max-sm:size-14 flex justify-center items-center">
            <HiOutlinePlusSm className="size-8 max-sm:size-12 text-red-900 hover:scale-110 transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
