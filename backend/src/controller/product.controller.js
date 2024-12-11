import { db } from "../config/database.js";
import env from "dotenv";

env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

async function getProducts(req, res) {
  try {
    const { category_id, sort_by, desc } = req.query;
    let queryContent = `select pds.id, pds.image, pds.name, pds.buyturn, pds.price,
       pds.created_at, ct.name as category_name, sales.discount,
       sales.time_start, sales.time_end from products pds 
       left join sales on pds.sale_id = sales.id 
       left join categories ct on ct.id = pds.category_id
       `;
    let values = [];
    if (category_id) {
      queryContent += ` where pds.category_id = $${values.length + 1}`;
      values.push(category_id);
    }
    if (sort_by) {
      if (sort_by === "discount") {
        queryContent += ` order by sales.${sort_by}`;
      } else {
        queryContent += ` order by pds.${sort_by}`;
      }
    }

    if (desc) {
      queryContent += ` desc`;
    }
    const { rows } = await db.query(queryContent, values);
    const products = rows.map((row) => {
      return {
        ...row,
        image: `http://${hostname}:${port}/images/products/${row.image}`,
      };
    });
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}

async function getTopDiscountProducts(req, res) {
  try {
    const { rows } = await db.query(`
        select pds.id, pds.image, pds.name, pds.buyturn, pds.price,
        pds.created_at, ct.name as category_name, sales.discount,
        sales.time_start, sales.time_end from products pds
        left join sales on pds.sale_id = sales.id
        left join categories ct on ct.id = pds.category_id
        order by sales.discount desc limit 10
        `);
    const products = rows.map((row) => {
      return {
        ...row,
        image: `http://${hostname}:${port}/images/products/${row.image}`,
      };
    });
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { product_id, name, price, discount } = req.body;
    console.log(req.body);
    let queryContent = `update products 
    set name = $2, price = $3, sale_id = $4
    where id = $1 
    `;
    let values = [product_id, name, price, discount / 10];
    await db.query(queryContent, values);
    res.status(200).json({
      messages: "Update data successful",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { product_id } = req.query;

    await db.query("delete from products where id = $1", [product_id]);
    res.status(200).json({
      messages: "Delete data successful",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}
async function getAllCategories(req, res) {
  try {
    const { rows } = await db.query("select * from categories");
    const categories = rows.map((row) => {
      return {
        ...row,
        image: `http://${hostname}:${port}/images/categories/${row.image}`,
      };
    });
    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}

export {
  getProducts,
  getAllCategories,
  updateProduct,
  getTopDiscountProducts,
  deleteProduct,
};
