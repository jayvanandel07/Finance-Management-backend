const db = require("../config/db");

const createUser = async (user) => {
  const { name, email } = user;
  const [result] = await db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
  return { id: result.insertId, ...user };
};

const getUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

module.exports = {
  createUser,
  getUsers,
};
