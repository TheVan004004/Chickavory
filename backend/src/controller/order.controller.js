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
    const { option } = req.query;

    let startDate, endDate;

    // Tính khoảng thời gian dựa trên option
    const currentDate = new Date();
    switch (option) {
      case "today":
        startDate = new Date(currentDate.setHours(0, 0, 0, 0)); // Đầu ngày
        endDate = new Date(currentDate.setHours(23, 59, 59, 999)); // Cuối ngày
        break;
      case "week":
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7)); // 7 ngày trước
        endDate = new Date(); // Hiện tại
        break;
      case "month":
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)); // 1 tháng trước
        endDate = new Date(); // Hiện tại
        break;
      case "all":
        startDate = new Date(0); // Thời điểm bắt đầu (epoch time)
        endDate = new Date(); // Hiện tại
        break;
      default:
        return res.status(400).json({
          message: "Invalid option",
        });
    }

    // Hàm chuyển đổi sang định dạng SQL datetime
    const formatToSQLDateTime = (date) => {
      const pad = (num) => String(num).padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`;
    };

    const startDateSQL = formatToSQLDateTime(startDate);
    const endDateSQL = formatToSQLDateTime(endDate);

    // Truy vấn dữ liệu từ cơ sở dữ liệu
    const { rows } = await db.query(
      `SELECT status, COUNT(*) as order_count 
       FROM orders 
       WHERE created_at BETWEEN $1 AND $2
       GROUP BY status`,
      [startDateSQL, endDateSQL]
    );

    res.status(200).json(rows);
  } catch (e) {
    res.status(400).json({
      message: "Error retrieving orders data",
      error: e.message,
    });
  }
}

export async function getOrderRevenue(req, res) {
  try {
    const { option } = req.query;

    let startDate, endDate;

    // Tính khoảng thời gian dựa trên option
    const currentDate = new Date();
    switch (option) {
      case "today":
        startDate = new Date(currentDate.setHours(0, 0, 0, 0)); // Đầu ngày
        endDate = new Date(currentDate.setHours(23, 59, 59, 999)); // Cuối ngày
        break;
      case "week":
        startDate = new Date(currentDate.setDate(currentDate.getDate() - 7)); // 7 ngày trước
        endDate = new Date(); // Hiện tại
        break;
      case "month":
        startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)); // 1 tháng trước
        endDate = new Date(); // Hiện tại
        break;
      case "all":
        startDate = new Date(0); // Thời điểm bắt đầu (epoch time)
        endDate = new Date(); // Hiện tại
        break;
      default:
        return res.status(400).json({
          message: "Invalid option",
        });
    }

    // Truy vấn tổng doanh thu
    const { rows } = await db.query(
      `
      SELECT SUM(od.price * od.count) as total_revenue
      FROM orders o
      JOIN order_detail od ON o.id = od.order_id
      WHERE o.created_at BETWEEN $1 AND $2
      `,
      [startDate.toISOString(), endDate.toISOString()] // Dùng ISO string để đảm bảo đúng định dạng
    );

    // Lấy kết quả từ truy vấn
    const totalRevenue = rows[0]?.total_revenue || 0;

    res.status(200).json({
      option,
      totalRevenue,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Error fetching revenue",
      error: e.message,
      stack: e.stack,
    });
  }
}

export async function getYearlyRevenue(req, res) {
  try {
    const currentYear = new Date().getFullYear();

    // Mảng để lưu doanh thu từng tháng
    const monthlyRevenue = new Array(12).fill(0);

    // Truy vấn doanh thu từng tháng trong năm hiện tại
    const { rows } = await db.query(
      `
      SELECT 
        EXTRACT(MONTH FROM o.created_at) AS month, 
        SUM(od.price * od.count) AS total_revenue
      FROM orders o
      JOIN order_detail od ON o.id = od.order_id
      WHERE EXTRACT(YEAR FROM o.created_at) = $1
      GROUP BY month
      ORDER BY month
      `,
      [currentYear]
    );

    // Gán doanh thu vào mảng
    rows.forEach((row) => {
      const monthIndex = row.month - 1; // Chỉ số tháng (0-11)
      monthlyRevenue[monthIndex] = parseFloat(row.total_revenue || 0);
    });

    res.status(200).json({
      year: currentYear,
      monthlyRevenue,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Error fetching yearly revenue",
      error: e.message,
      stack: e.stack,
    });
  }
}

export async function getYearlyOrderCount(req, res) {
  try {
    const currentYear = new Date().getFullYear();

    // Mảng để lưu số lượng đơn hàng của từng tháng
    const monthlyOrderCount = new Array(12).fill(0);

    // Truy vấn số lượng đơn hàng từng tháng trong năm hiện tại
    const { rows } = await db.query(
      `
      SELECT 
        EXTRACT(MONTH FROM o.created_at) AS month, 
        COUNT(o.id) AS total_orders
      FROM orders o
      WHERE EXTRACT(YEAR FROM o.created_at) = $1
      GROUP BY month
      ORDER BY month
      `,
      [currentYear]
    );

    rows.forEach((row) => {
      const monthIndex = row.month - 1; // Chỉ số tháng (0-11)
      monthlyOrderCount[monthIndex] = parseInt(row.total_orders || 0);
    });

    res.status(200).json({
      year: currentYear,
      monthlyOrderCount,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      message: "Error fetching yearly order count",
      error: e.message,
      stack: e.stack,
    });
  }
}
