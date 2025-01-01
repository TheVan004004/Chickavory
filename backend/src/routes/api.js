import express from "express";
import {
  login,
  signup,
  update,
  updatePassword,
} from "../controller/user.controller.js";
import {
  addProduct,
  deleteProduct,
  getAllCategories,
  getProducts,
  getPurchasedProduct,
  getTopDiscountProducts,
  updateProduct,
} from "../controller/product.controller.js";
import {
  addToCart,
  deleteProductInCart,
  getProductsInCart,
  updateProductInCart,
} from "../controller/cart.controller.js";
import {
  getChartOrder,
  getOrder,
  order,
  updateOrderForAdmin,
  updateOrderForUser,
} from "../controller/order.controller.js";
import { uploadProductImage } from "../middleware/upload.js";

const router = express.Router();
// init route
const initAPIRoute = (app) => {
  //user
  app.post("/api/user/signup", signup);
  app.post("/api/user/login", login);
  app.put("/api/user/update", update);
  app.put("/api/user/update/password", updatePassword);

  //product
  app.get("/api/product", getProducts);
  app.get("/api/product/category", getAllCategories);
  app.get("/api/product/most_discount", getTopDiscountProducts);
  app.post("/api/product/add", uploadProductImage, addProduct);
  app.put("/api/product/update", updateProduct);
  app.delete("/api/product/delete", deleteProduct);

  //cart
  app.post("/api/user/cart/add", addToCart);
  app.get("/api/user/cart/product", getProductsInCart);
  app.delete("/api/user/cart/product/delete", deleteProductInCart);
  app.put("/api/user/cart/product/update", updateProductInCart);
  app.get("/api/user/product/purcharsed", getPurchasedProduct);

  //order
  app.post("/api/user/order", order);
  app.get("/api/user/order/get", getOrder);
  app.put("/api/user/order/update_status", updateOrderForUser);
  app.put("/api/admin/order/update_status", updateOrderForAdmin);

  // chart
  app.get("/api/admin/chart/order/status", getChartOrder);

  app.use("/api/v1", router);
};

export { initAPIRoute };
