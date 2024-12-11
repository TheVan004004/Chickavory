import axios from "axios";

const addToCartAPI = (input) => {
  const { user_id, product_id, count } = input;
  const data = {
    user_id: user_id,
    product_id: product_id,
    count: count,
  };
  return axios.post("http://localhost:8080/api/user/cart", data);
};
const getProductsInCartAPI = (id) => {
  const data = {
    params: {
      user_id: id,
    },
  };
  return axios.get("http://localhost:8080/api/user/cart/product", data);
};

const deleteProductInCartAPI = ({ user_id, product_id }) => {
  const data = {
    params: {
      user_id: user_id,
      product_id: product_id,
    },
  };
  return axios.delete(
    "http://localhost:8080/api/user/cart/product/delete",
    data
  );
};

const updateProductInCartAPI = ({ user_id, product_id, count }) => {
  const data = {
    user_id: user_id,
    product_id: product_id,
    count: count,
  };
  console.log(data);
  return axios.put("http://localhost:8080/api/user/cart/product/update", data);
};
export {
  addToCartAPI,
  getProductsInCartAPI,
  deleteProductInCartAPI,
  updateProductInCartAPI,
};
