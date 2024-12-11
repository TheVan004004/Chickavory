import { createContext, useEffect, useState } from "react";
import { getProductsAPI } from "../services/product.api";

export const MainContext = createContext({});

export const ContextWrapper = (props) => {
  const [isOpenNavRight, setIsOpenNavRight] = useState(false);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "") || ""
  );
  const [stateModalUser, setStateModalUser] = useState("login");
  const [categorySelected, setCategorySelected] = useState({
    id: "ALL",
    name: "ALL",
    image: null,
  });
  const [sort_by, setSort_by] = useState("");
  const [desc, setDesc] = useState("");
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [categorySelected, sort_by, desc]);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  const getProducts = async () => {
    const res = await getProductsAPI({
      category_id: categorySelected.id,
      sort_by: sort_by,
      desc: desc,
    });
    console.log(desc);
    setListProducts(res.data);
  };
  return (
    <MainContext.Provider
      value={{
        isOpenNavRight,
        setIsOpenNavRight,
        isOpenModalUser,
        setIsOpenModalUser,
        user,
        setUser,
        stateModalUser,
        setStateModalUser,
        categorySelected,
        setCategorySelected,
        sort_by,
        setSort_by,
        desc,
        setDesc,
        listProducts,
        setListProducts,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
