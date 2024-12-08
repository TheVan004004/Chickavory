import React from "react";
import CardSelect from "../product/CardSelect";
import chickens from "../../assets/Categories/chickens.jpg";
import burgers from "../../assets/Categories/burgers.jpg";
import drinks from "../../assets/Categories/drinks.jpg";
export default function OptionMenu() {
  return (
    <>
      <div className="max-md:hidden flex justify-between gap-0 items-center h-24 rounded-xl bg-red-200 shadow-md shadow-red-400/50">
        <div className="text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 rounded-l-xl font-medium text-xl hover:text-white">
          Bán chạy
        </div>
        <div className="h-full w-full py-4 hover:bg-red-400">
          <div className="text-red-800 flex justify-center items-center h-full w-full border-l-[1px] border-r-[1px] border-red-400 font-medium text-xl hover:text-white">
            Giảm giá
          </div>
        </div>
        <div className="h-full w-full py-4 hover:bg-red-400">
          <div className="text-red-800 flex justify-center items-center h-full w-full border-r-[1px] border-red-400 font-medium text-xl hover:text-white">
            Combo
          </div>
        </div>
        <div className="text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 rounded-r-xl font-medium text-xl hover:text-white">
          Đánh giá cao
        </div>
      </div>
      <div className="hidden max-md:grid grid-cols-2 gap-4">
        <div className="bg-red-200 shadow-md shadow-red-400/20 py-6 text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 rounded-xl hover:text-white font-medium">
          Bán chạy
        </div>
        <div className="bg-red-200 shadow-md shadow-red-400/20 py-6 text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 rounded-xl hover:text-white font-medium">
          Giảm giá
        </div>
        <div className="bg-red-200 shadow-md shadow-red-400/20 py-6 text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 rounded-xl hover:text-white font-medium">
          Combo
        </div>
        <div className="bg-red-200 shadow-md shadow-red-400/20 py-6 text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 rounded-xl hover:text-white font-medium">
          Đánh giá cao
        </div>
      </div>
      <div className="w-[17rem] h-[2px] bg-red-600"></div>
      <div className="w-full">
        <div className="flex flex-nowrap gap-4">
          <CardSelect img={chickens} />
          <CardSelect img={burgers} />
          <CardSelect img={drinks} />
        </div>
      </div>
    </>
  );
}
