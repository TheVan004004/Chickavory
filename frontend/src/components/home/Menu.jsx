import React from "react";
import Product from "../product/Product";
import useMainContext from "../../hooks/useMainContext";

export default function Menu({
  listProducts,
  categorySelected,
  setSort_by,
  setDesc,
}) {
  const handleSwitchSort = (sort_by) => {
    if (sort_by === "price_asc") {
      setDesc("");
      setSort_by("price");
      return;
    }
    setDesc("desc");
    setSort_by(sort_by);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-3xl">
          {categorySelected && categorySelected.id !== "ALL"
            ? categorySelected.name + " :"
            : ""}
        </h1>
        <div className="flex gap-2 items-center">
          <h3 className="font-medium text-xl">Sort by: </h3>
          <div className="bg-red-400 p-2 rounded-full">
            <select
              className="bg-red-400 outline-none text-white"
              onChange={(e) => handleSwitchSort(e.target.value)}
            >
              <option value="buyturn">Buyturn</option>
              <option value="price">Price high to low</option>
              <option value="price_asc">Price low to high</option>
              <option value="discount">Discount</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid gap-x-8 gap-y-12 grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {listProducts.map((product, index) => {
          return <Product product={product} key={product.id} />;
        })}
      </div>
      {/* <div className="flex justify-center items-center  ">
        <button
          className="text-red-900 font-medium w-56 py-3 
        rounded-xl border-red-900 border-2 border-dashed hover:w-72 
        hover:rounded-3xl hover:border-solid hover:tracking-widest 
        transition-all duration-500"
        >
          View More
        </button>
      </div> */}
    </>
  );
}
