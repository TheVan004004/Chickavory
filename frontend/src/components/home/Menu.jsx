import React from "react";
import Product from "../product/Product";

export default function Menu() {
  return (
    <>
      <div className="grid gap-x-8 gap-y-12 grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <div className="flex justify-center items-center  ">
        <button
          className="text-red-900 font-medium w-56 py-3 
        rounded-xl border-red-900 border-2 border-dashed hover:w-72 
        hover:rounded-3xl hover:border-solid hover:tracking-widest 
        transition-all duration-500"
        >
          View More
        </button>
      </div>
    </>
  );
}
