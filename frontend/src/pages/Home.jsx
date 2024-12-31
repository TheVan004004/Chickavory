import React, { useEffect, useState } from "react";
import Advertises from "../components/news/Advertises";
import Search from "../components/home/Search";
import OptionMenu from "../components/home/OptionMenu";
import Menu from "../components/home/Menu";
import { getProductsAPI } from "../services/product.api";

export default function Home() {
  const [nameSearch, setNameSearch] = useState("");
  const [sort_by, setSort_by] = useState("");
  const [desc, setDesc] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const [categorySelected, setCategorySelected] = useState({
    id: "ALL",
    name: "ALL",
    image: null,
  });
  useEffect(() => {
    getProducts();
  }, [categorySelected, sort_by, desc]);
  const getProducts = async () => {
    const res = await getProductsAPI({
      name: nameSearch,
      category_id: categorySelected.id,
      sort_by: sort_by,
      desc: desc,
    });
    setListProducts(res.data);
  };
  return (
    <div className="pt-24 pb-8 mx-16 flex flex-col gap-6">
      <Search
        nameSearch={nameSearch}
        setNameSearch={setNameSearch}
        getProducts={getProducts}
      />
      <OptionMenu
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
      />
      <Menu
        listProducts={listProducts}
        setListProducts={setListProducts}
        setSort_by={setSort_by}
        setDesc={setDesc}
        categorySelected={categorySelected}
      />
    </div>
  );
}
