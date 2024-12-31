import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
export default function Search({ nameSearch, setNameSearch, getProducts }) {
  return (
    <div className=" flex justify-between gap-[10px] rounded-full shadow-md shadow-red-500/20 outline-none border-2 border-red-400">
      <input
        className="w-[90%] px-5 py-2 rounded-full outline-none focus:bg-transparent"
        placeholder="search"
        value={nameSearch}
        onChange={(e) => setNameSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getProducts();
          }
        }}
      ></input>
      <button
        className="flex-shrink-0 size-12 rounded-full bg-red-900 shadow-md shadow-red-500/50 text-white flex justify-center items-center cursor-pointer hover:bg-red-500"
        onClick={getProducts}
      >
        <HiOutlineSearch className="size-6" />
      </button>
    </div>
  );
}
