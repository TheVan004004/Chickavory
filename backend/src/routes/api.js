import express from "express";
import { login, signup } from "../controller/user.controller.js";

const router = express.Router();
// init route
const initAPIRoute = (app) => {
  //user
  app.post("/api/user/signup", signup);
  app.get("/api/user/login", login);
  app.use("/api/v1", router);
};

export { initAPIRoute };
