const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getAllTransactions = async () => {
  const [rows] = await db.query(
    `SELECT 
    t.*, 
    u.name AS user_name,
    u.tamil_name AS user_tamil_name,
    u.phone AS user_phone,
    u.address AS user_address
    FROM transactions AS t JOIN users AS u 
    ON t.user_id=u.user_id `
  );
  return rows;
};

module.exports = {
  getAllTransactions,
};
