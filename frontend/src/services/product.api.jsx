import axios from "axios";

const getCategoriesAPI = () => {
  return axios.get("http://localhost:8080/api/product/category");
};

const getTopDiscountAPI = () => {
  return axios.get("http://localhost:8080/api/product/most_discount");
};
const getProductsAPI = (input) => {
  const { category_id, sort_by, desc } = input;
  const data = {
    params: {
      category_id: category_id !== "ALL" ? category_id || "" : "",
      sort_by: sort_by || "",
      desc: desc || "",
    },
  };
  return axios.get("http://localhost:8080/api/product", data);
};

const updateProductAPI = (input) => {
  const { product_id, price, name, discount } = input;
  const data = {
    product_id: product_id,
    price: price,
    name: name,
    discount: discount,
  };
  console.log(data);
  return axios.put("http://localhost:8080/api/product/update", data);
};

const deleteProductAPI = (product_id) => {
  const data = {
    params: {
      product_id: product_id,
    },
  };
  return axios.delete("http://localhost:8080/api/product/delete", data);
};
export {
  getCategoriesAPI,
  getProductsAPI,
  getTopDiscountAPI,
  updateProductAPI,
  deleteProductAPI,
};
