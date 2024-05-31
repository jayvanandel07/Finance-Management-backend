const db = require("../config/db");

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
