import express from "express";
import dotenv from "dotenv";
import { configEngine } from "./config/config.js";
import { db } from "./config/database.js";
import { initAPIRoute } from "./routes/api.js";

dotenv.config();
const app = express(); // app express
const port = process.env.PORT; //port
const hostname = process.env.HOST_NAME;

// config engine
configEngine(app);

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// init api
initAPIRoute(app);

//connect database
db.connect();

app.listen(port, hostname, () => {
  console.log(`App listening on port ${port}`);
});
