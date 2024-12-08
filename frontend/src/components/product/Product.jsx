import React from "react";
import chicken from "../../assets/chicken.png";
import { HiOutlineTag, HiOutlinePlusSm } from "react-icons/hi";
import CountDownTime from "../CountDown";
export default function Product() {
  return (
    <div className="rounded-xl p-4 h-auto shadow-md shadow-red-400/50 hover:shadow-lg hover:shadow-red-400/50 transition-all duration-1000">
      <div className="rounded-xl border-[1px] border-red-500 bg-red-100">
        <img className="w-full h-auto rounded-xl" src={chicken} alt="" />
      </div>
      <div className="font-medium py-2 text-xl max-sm:text-2xl">
        Tên sản phẩm
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-red-400 font-semibold text-3xl max-sm:text-4xl">
            99.000đ
          </p>
          <div className="flex gap-2 items-center">
            <HiOutlineTag className="rotate-90 text-red-400 size-5" />
            <del className="text-gray-400">100.000đ</del>
          </div>
        </div>
        <div className="bg-red-400 rounded-xl size-12 max-sm:size-16 flex justify-center items-center">
          <HiOutlinePlusSm className="size-8 max-sm:size-12 text-white hover:scale-110 transition-all duration-500" />
        </div>
      </div>
      <div></div>
    </div>
  );
}
