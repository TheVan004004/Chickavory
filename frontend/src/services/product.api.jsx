import axios from "axios";
import { urlAPI } from "./url";

export const getCategoriesAPI = () => {
  return axios.get(urlAPI.getCategories);
};

export const getTopDiscountAPI = () => {
  return axios.get("http://localhost:8080/api/product/most_discount");
};
export const getProductsAPI = ({ category_id, sort_by, desc, name }) => {
  const data = {
    params: {
      name: name,
      category_id: category_id !== "ALL" ? category_id || "" : "",
      sort_by: sort_by || "",
      desc: desc || "",
    },
  };
  return axios.get(urlAPI.getProducts, data);
};

export const updateProductAPI = ({ product_id, price, name, discount }) => {
  const data = {
    product_id: product_id,
    price: price,
    name: name,
    discount: discount,
  };

  return axios.put(urlAPI.updateProduct, data);
};

export const deleteProductAPI = (product_id) => {
  const data = {
    params: {
      product_id: product_id,
    },
  };
  return axios.delete(urlAPI.deleteProduct, data);
};

export const addNewProductAPI = (formData) => {
  return axios.post(urlAPI.addProduct, formData);
};

export const getPurchasedProductAPI = (user_id) => {
  return axios.get(urlAPI.purchasedProduct, {
    params: {
      user_id: user_id,
    },
  });
};
