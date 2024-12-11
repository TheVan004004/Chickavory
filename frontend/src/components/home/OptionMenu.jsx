import React, { useEffect, useState } from "react";
import CardSelect from "../product/CardSelect";
import { getCategoriesAPI } from "../../services/product.api";
import useMainContext from "../../hooks/useMainContext";
import OptionSort from "./components/OptionSort";
import OptionSortForSmallView from "./components/OptionSortForSmallView";

export default function OptionMenu() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const res = await getCategoriesAPI();
    setCategories([{ id: "ALL", name: "ALL", image: null }, ...res.data]);
  };
  const options = [
    { name: "Best Seller", sort_by: "buyturn" },
    { name: "Super Discount", sort_by: "sale" },
    { name: "Hottest Combo", sort_by: "buyturn" },
    { name: "Top Rate", sort_by: "buyturn" },
  ];
  return (
    <>
      <div className="max-md:hidden flex justify-between gap-0 items-center h-24 rounded-xl bg-red-200 shadow-md shadow-red-400/50">
        {options.map((option, index) => {
          if (index === 0)
            return (
              <OptionSort option={option} position="first" key={option.name} />
            );
          if (index === options.length - 1)
            return (
              <OptionSort option={option} position="last" key={option.name} />
            );
          return (
            <OptionSort option={option} position="mid" key={option.name} />
          );
        })}
      </div>
      <div className="hidden max-md:grid grid-cols-2 gap-4">
        {options.map((option, index) => {
          return (
            <OptionSortForSmallView
              option={option}
              key={option.name + "small"}
            />
          );
        })}
      </div>
      <div className="w-[17rem] h-[2px] bg-red-600"></div>
      <div className="w-full">
        <div className="flex flex-nowrap gap-4">
          {categories.map((category, index) => {
            return <CardSelect category={category} key={category.id} />;
          })}
        </div>
      </div>
    </>
  );
}
