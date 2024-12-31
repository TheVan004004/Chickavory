import express from "express";
import { login, signup, update } from "../controller/user.controller.js";
import {
  addProduct,
  deleteProduct,
  getAllCategories,
  getProducts,
  getTopDiscountProducts,
  updateProduct,
} from "../controller/product.controller.js";
import {
  addToCart,
  deleteProductInCart,
  getProductsInCart,
  updateProductInCart,
} from "../controller/cart.controller.js";
import { getOrder, order } from "../controller/order.controller.js";
import { uploadProductImage } from "../middleware/upload.js";

const router = express.Router();
// init route
const initAPIRoute = (app) => {
  //user
  app.post("/api/user/signup", signup);
  app.post("/api/user/login", login);
  app.put("/api/user/update", update);

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

  //order
  app.post("/api/user/order", order);
  app.get("/api/user/order/get", getOrder);

  app.use("/api/v1", router);
};

export { initAPIRoute };
