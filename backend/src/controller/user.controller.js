import { db } from "../config/database.js";

export const login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      throw { messages: "Error" };
    }

    const { rows } = await db.query("select * from users where username = $1", [
      username,
    ]);
    if (rows.length === 0) {
      throw { messages: "Username does not exist. Try signing up." };
    }
    if (rows[0]?.password !== password) {
      throw { messages: "Password is incorrect. Try again" };
    }
    const { id, access_token, address, phonenumber, fullname, role } = rows[0];
    const user = {
      id: id,
      username: username,
      access_token: access_token,
      address: address,
      phonenumber: phonenumber,
      fullname: fullname,
    };
    res.status(200).json({
      messages: "Login successful",
      user: role === "admin" ? { ...user, role: role } : user,
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { user_id, address, phonenumber, fullname } = req.body;
    await db.query(
      `
      update users
      set address = $2, phonenumber = $3, fullname = $4
      where id = $1;
      `,
      [user_id, address, phonenumber, fullname]
    );

    res.status(200).json({
      messages: "Update successful",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { user_id, currentPassword, password } = req.body;
    const { rows } = await db.query("select * from users where id = $1", [
      user_id,
    ]);
    if (rows[0].password !== currentPassword) {
      throw { messages: "Password is incorrect. Try again" };
    }
    await db.query(
      `
      update users
      set password = $2
      where id = $1;
      `,
      [user_id, password]
    );

    res.status(200).json({
      messages: "Update successful",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      throw { messages: "Error" };
    }
    const { rows } = await db.query("select * from users where username = $1", [
      username,
    ]);
    if (rows.length > 0) {
      throw { messages: "Username already exists. Try logging in." };
    }
    await db.query(
      "insert into users(username,password,created_at) values ($1,$2,Now())",
      [username, password]
    );
    res.status(200).json({
      messages: "Sign up successful",
    });
  } catch (e) {
    res.status(400).json({
      messages: e.messages,
    });
  }
};
