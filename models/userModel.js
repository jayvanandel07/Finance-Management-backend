const db = require("../config/db");
const HttpError = require("../utils/httpError");

const createUser = async (user) => {
  const {
    user_id,
    name,
    tamil_name,
    alias,
    email,
    phone,
    address,
    cibil,
    user_type,
  } = user;
  const [existingUser] = await db.query(
    "SELECT * FROM users WHERE user_id = ?",
    [user_id]
  );
  if (existingUser.length > 0) {
    throw new HttpError("User already Exists", 409);
  }
  const [result] = await db.query(
    "INSERT INTO users (user_id, name, tamil_name, alias, email, phone, address, cibil, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [user_id, name, tamil_name, alias, email, phone, address, cibil, user_type]
  );
  return user;
};

const getUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

module.exports = {
  createUser,
  getUsers,
};
