import { db } from "../config/database.js";
import env from "dotenv";
import path from "path";
import { removeVietnameseTones } from "../services/services.js";

env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

export async function getProducts(req, res) {
  try {
    const { name, category_id, sort_by, desc } = req.query;
    const nameNonVNT = removeVietnameseTones(name);
    let queryContent = `select pds.id, pds.image, pds.name, pds.buyturn, pds.price,
       pds.created_at, ct.name as category_name, sales.discount,
       sales.time_start, sales.time_end from products pds 
       left join sales on pds.sale_id = sales.id 
       left join categories ct on ct.id = pds.category_id
       `;
    let values = [];
    queryContent += ` where active = true and `;

    queryContent += `pds.name ilike '%${nameNonVNT ? nameNonVNT : "_"}%'`;

    if (category_id) {
      queryContent += ` and pds.category_id = $${values.length + 1}`;
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
    console.log(e);
    res.status(400).json({
      messages: e.messages,
    });
  }
}

export async function getTopDiscountProducts(req, res) {
  try {
    const { rows } = await db.query(`
        select pds.id, pds.image, pds.name, pds.buyturn, pds.price,
        pds.created_at, ct.name as category_name, sales.discount,
        sales.time_start, sales.time_end from products pds
        left join sales on pds.sale_id = sales.id
        left join categories ct on ct.id = pds.category_id
        where active = true
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

export async function updateProduct(req, res) {
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

export async function deleteProduct(req, res) {
  try {
    const { product_id } = req.query;

    await db.query("update products set active = false where id = $1", [
      product_id,
    ]);
    res.status(200).json({
      messages: "Delete data successful",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}

export async function addProduct(req, res) {
  try {
    const { name, price, sale_id, category_id } = req.body;
    const { rows } = await db.query(
      `select count(name) from products where category_id = $1 `,
      [category_id[0]]
    );
    const count = rows[0].count + 1;
    const id =
      category_id +
      "." +
      (count < 10 ? "00" + count : count < 100 ? "0" + count : count);
    const image = path.parse(req.files.image[0].filepath).name + ".png";
    await db.query(
      `insert into products 
      (id,name,price,image,sale_id,category_id,created_at,buyturn) 
      values ($1,$2,$3,$4,$5,$6,Now(),0) `,
      [id, name[0], price[0], image, sale_id[0], category_id[0]]
    );

    res.status(200).json({
      message: "Product added successfully!",
      data: {
        fields: req.body,
        files: req.files,
      },
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
}

export async function getAllCategories(req, res) {
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

export async function getPurchasedProduct(req, res) {
  try {
    const { user_id } = req.query;
    let queryContent = `
    select pds.id, pds.image, pds.name, pds.price,
      ct.name as category_name, sales.discount, sum(od.count) as total_count
      from orders o
      join order_detail od on od.order_id = o.id
      join products pds on pds.id = od.product_id
      left join sales on pds.sale_id = sales.id
      left join categories ct on ct.id = pds.category_id
      where o.user_id = $1
      group by pds.id, pds.image, pds.name, pds.price, ct.name, sales.discount
      order by sum(od.count) desc;
    `;
    let value = [user_id];
    const { rows } = await db.query(queryContent, value);
    const products = rows?.map((row) => {
      return {
        ...row,
        image: `http://${hostname}:${port}/images/products/${row.image}`,
      };
    });
    res.status(200).json(products);
  } catch (e) {
    console.error(e);
    res.status(400).json({
      messages: e.message,
    });
  }
}
