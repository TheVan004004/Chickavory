import path from "path";
import express from "express";
const configEngine = (app) => {
  //config static files
  app.use(express.static(path.join("./src", "public")));
};

export { configEngine };
