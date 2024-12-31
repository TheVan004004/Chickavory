import { db } from "../config/database.js";
import env from "dotenv";

env.config();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
async function order(req, res) {
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
          INSERT INTO order_detail (order_id, product_id, count)
          VALUES ($1, $2, $3)
          `,
        [order_id, order.id, order.count]
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

async function getOrder(req, res) {
  try {
    const { user_id, status } = req.query;
    let queryContent = `
    select o.id, od.count, pds.id, pds.image, pds.name, pds.price,
    o.created_at, ct.name as category_name, sales.discount
    from orders o
    join order_detail od on od.order_id = o.id
    join products pds on pds.id = od.product_id
    left join sales on pds.sale_id = sales.id
    left join categories ct on ct.id = pds.category_id
    where o.user_id = $1
    `;
    let value = [user_id];
    if (status) {
      queryContent += " and status = $2";
      value = [user_id, status];
    }
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

export { order, getOrder };
