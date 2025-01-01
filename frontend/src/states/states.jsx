import { createContext, useEffect, useState } from "react";
import { getCategoriesAPI } from "../services/product.api";

export const MainContext = createContext({});

export const ContextWrapper = (props) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || "";
    } catch (error) {
      return "";
    }
  });
  const [stateModalUser, setStateModalUser] = useState("login");
  const [isOpenNavRight, setIsOpenNavRight] = useState(false);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const res = await getCategoriesAPI();
    setCategories([{ id: "", name: "All", image: null }, ...res.data]);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
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
        categories,
        setCategories,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
