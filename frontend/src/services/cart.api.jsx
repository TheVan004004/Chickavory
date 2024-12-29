import axios from "axios";
import { urlAPI } from "./url";

export const addToCartAPI = (input) => {
  const { user_id, product_id, count } = input;
  const data = {
    user_id: user_id,
    product_id: product_id,
    count: count,
  };
  return axios.post(urlAPI.addToCart, data);
};
export const getProductsInCartAPI = (id) => {
  const data = {
    params: {
      user_id: id,
    },
  };
  return axios.get(urlAPI.getCart, data);
};

export const deleteProductInCartAPI = ({ user_id, product_id }) => {
  const data = {
    params: {
      user_id: user_id,
      product_id: product_id,
    },
  };
  return axios.delete(urlAPI.deleteProductInCart, data);
};

export const updateProductInCartAPI = ({ user_id, product_id, count }) => {
  const data = {
    user_id: user_id,
    product_id: product_id,
    count: count,
  };
  return axios.put(urlAPI.updateProductInCart, data);
};
