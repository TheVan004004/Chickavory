import { db } from "../config/database.js";
import env from "dotenv";

env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

async function addToCart(req, res) {
  try {
    const { user_id, product_id, count } = req.body;
    if (!user_id && !product_id && !count) {
      throw { messages: "Error" };
    }
    const { rows } = await db.query(
      "select * from carts where user_id = $1 and product_id = $2",
      [user_id, product_id]
    );

    if (rows.length == 0) {
      await db.query(
        "insert into carts (user_id,product_id,count,created_at) values ($1,$2,$3,Now())",
        [user_id, product_id, count]
      );
    }

    res.status(200).json({
      messages: "Added to cart",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}

async function getProductsInCart(req, res) {
  try {
    const user_id = req.query.user_id;
    console.log("check", user_id);
    const { rows } = await db.query(
      `select pds.id, pds.image, pds.name, 
        pds.buyturn, pds.price, pds.created_at, 
        pds.category_id, sales.discount, sales.time_start, 
        sales.time_end, carts.count
        from products pds 
        left join sales on pds.sale_id = sales.id
        join carts on carts.product_id = pds.id
        join users on users.id = carts.user_id
        where users.id = $1
        order by carts.created_at
        `,
      [user_id]
    );
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

async function deleteProductInCart(req, res) {
  try {
    const { user_id, product_id } = req.query;
    await db.query(
      `delete from carts
      where user_id = $1 and product_id = $2
        `,
      [user_id, product_id]
    );

    res.status(200).json({
      messages: "Delete Successful",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}

async function updateProductInCart(req, res) {
  try {
    const { user_id, product_id, count } = req.body;

    await db.query(
      ` update carts
          set count = $3
          where user_id = $1 and product_id = $2
            `,
      [user_id, product_id, count]
    );

    res.status(200).json({
      messages: "Update Successful",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
}
export {
  addToCart,
  getProductsInCart,
  deleteProductInCart,
  updateProductInCart,
};
