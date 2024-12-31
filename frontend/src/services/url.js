const url = "http://localhost:8080/api";

export const urlAPI = {
  // user
  login: `${url}/user/login`,
  signup: `${url}/user/signup`,
  updateUser: `${url}/user/update`,

  //order
  order: `${url}/user/order`,
  getOrder: `${url}/user/order/get`,

  //cart
  getCart: `${url}/user/cart/product`,
  addToCart: `${url}/user/cart/add`,
  deleteProductInCart: `${url}/user/cart/product/delete`,
  updateProductInCart: `${url}/user/cart/product/update`,

  //product
  getCategories: `${url}/product/category`,
  getProducts: `${url}/product`,
  updateProduct: `${url}/product/update`,
  deleteProduct: `${url}/product/delete`,
  addProduct: `${url}/product/add`,
};
