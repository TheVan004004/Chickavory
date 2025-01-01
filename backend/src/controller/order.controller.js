import { query } from "express";
import { db } from "../config/database.js";
import env from "dotenv";

env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
export async function order(req, res) {
  try {
    const { user_id, listOrder } = req.body;

    // create order
    const { rows } = await db.query(
      "INSERT INTO orders (user_id, created_at, status) VALUES ($1, NOW(), 'pending') RETURNING id",
      [user_id]
    );
    const order_id = rows[0].id;

    console.log(listOrder);

    for (const order of listOrder) {
      // delete product in cart
      await db.query(
        "DELETE FROM carts WHERE user_id = $1 AND product_id = $2",
        [user_id, order.id]
      );

      // update buyturn
      await db.query(
        `
          UPDATE products
          SET buyturn = buyturn + $1
          WHERE id = $2
          `,
        [order.count, order.id]
      );

      // create order_detail
      await db.query(
        `
          INSERT INTO order_detail (order_id, product_id, count, price)
          VALUES ($1, $2, $3, $4)
          `,
        [
          order_id,
          order.id,
          order.count,
          (order.price * (100 - order.discount)) / 100,
        ]
      );
    }

    res.status(200).json({
      messages: "Order created successfully",
      order_id,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      messages: e.message,
    });
  }
}

export async function getOrder(req, res) {
  try {
    const { user_id, status } = req.query;
    let queryContent = "SELECT * FROM orders ";
    const value = [];
    if (user_id || status) {
      queryContent += "WHERE ";
      if (user_id) {
        queryContent += `user_id = $${value.length + 1} `;
        value.push(user_id);
        if (status) queryContent += "AND ";
      }
      if (status) {
        queryContent += `status = $${value.length + 1} `;
        value.push(status);
      }
    }
    queryContent += " order by created_at desc, id desc";
    const { rows } = await db.query(queryContent, value);

    const orders = await Promise.all(
      rows.map(async (order) => {
        // Truy vấn danh sách sản phẩm
        const products = await db.query(
          `
          SELECT pds.id, pds.image, pds.name, od.price,
                 ct.name as category_name, od.count
          FROM orders o
          JOIN order_detail od ON od.order_id = o.id
          JOIN products pds ON pds.id = od.product_id
          LEFT JOIN sales ON pds.sale_id = sales.id
          LEFT JOIN categories ct ON ct.id = pds.category_id
          WHERE o.id = $1
          `,
          [order.id]
        );

        const productList = products.rows?.map((row) => ({
          ...row,
          image: `http://${hostname}:${port}/images/products/${row.image}`,
        }));

        // Truy vấn thông tin người dùng
        const user = await db.query(
          "SELECT address, phonenumber, fullname FROM users WHERE id = $1",
          [order.user_id]
        );

        return {
          ...order,
          user: user.rows[0] || null,
          listProduct: productList,
        };
      })
    );

    res.status(200).json(orders);
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Error fetching orders",
      error: e.message,
      stack: e.stack,
    });
  }
}

export async function updateOrderForUser(req, res) {
  try {
    const { order_id } = req.body;
    await db.query("update orders set status = 'completed' where id = $1", [
      order_id,
    ]);

    res.status(200).json({
      message: "Update status successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: "Error update order",
    });
  }
}

export async function updateOrderForAdmin(req, res) {
  try {
    const { order_id } = req.body;
    await db.query("update orders set status = 'processing' where id = $1", [
      order_id,
    ]);

    res.status(200).json({
      message: "Update status successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: "Error update order",
    });
  }
}

export async function getChartOrder(req, res) {
  try {
    const { start, end, date } = req.body;
    let queryString = `
        SELECT status, COUNT(*) as order_count 
       FROM orders 
       `;
    let value = [];
    if (start && end) {
      queryString += `WHERE created_at BETWEEN $1 AND $2`;
      value = [start, end];
    }
    if (date) {
      queryString += `WHERE created_at BETWEEN $1 AND $2`;
      value = [date];
    }

    queryString += " GROUP BY status";

    const { rows } = await db.query(queryString, value);

    res.status(200).json(rows);
  } catch (e) {
    res.status(400).json({
      message: "Error retrieving orders data",
      error: e.message,
    });
  }
}
