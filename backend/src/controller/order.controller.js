import { db } from "../config/database.js";
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

    // Phản hồi thành công
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

export { order };
