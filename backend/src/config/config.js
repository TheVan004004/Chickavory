import path from "path";
import cors from "cors";
import express from "express";
const configEngine = (app) => {
  //Cors
  app.use(cors());

  //config static files
  app.use(express.static(path.join("./src", "public")));
};

export { configEngine };
