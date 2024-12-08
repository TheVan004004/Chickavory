import { db } from "../config/database.js";

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const { rows } = await db.query("select * from users where username = $1", [
    username,
  ]);
  if (rows.length === 0) {
    res.status(400).json({
      messages: "Username does not exist. Try signing up.",
    });
    return;
  }
  if (rows[0]?.password !== password) {
    res.status(400).json({
      messages: "Password is incorrect. Try again",
    });
    return;
  }
  res.status(200).json({
    messages: "Login successful",
  });
};

const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const { rows } = await db.query("select * from users where username = $1", [
    username,
  ]);
  if (rows.length > 0) {
    res.status(400).json({
      messages: "Username already exists. Try logging in.",
    });
    return;
  }
  await db.query("insert into users(username,password) values ($1,$2)", [
    username,
    password,
  ]);
  res.status(200).json({
    messages: "Sign up successful",
  });
};

export { signup, login };
