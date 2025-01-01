const url = "http://localhost:8080/api";

export const urlAPI = {
  // user
  login: `${url}/user/login`,
  signup: `${url}/user/signup`,
  updateUser: `${url}/user/update`,
  updatePassword: `${url}/user/update/password`,

  //order
  order: `${url}/user/order`,
  getOrder: `${url}/user/order/get`,
  updateStatusForUser: `${url}/user/order/update_status`,
  updateStatusForAdmin: `${url}/admin/order/update_status`,

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
  purchasedProduct: `${url}/user/product/purcharsed`,

  //chart
  getChartStatusOrder: `${url}/admin/chart/order/status`,
};
