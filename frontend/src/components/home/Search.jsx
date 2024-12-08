import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
export default function Search() {
  return (
    <div className=" flex justify-between gap-[10px]">
      <input
        className="w-[95%] shadow-md shadow-red-500/20 rounded-full px-5 py-2 outline-none border-2 border-red-400 focus:bg-transparent"
        placeholder="search"
      ></input>
      <button className="flex-shrink-0 size-12 rounded-full bg-red-900 shadow-md shadow-red-500/50 text-white flex justify-center items-center">
        <HiOutlineSearch className="size-6" />
      </button>
    </div>
  );
}
