const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getAllLoans = async () => {
  const [rows] = await db.query(
    `SELECT 
    l.*, 
    u.name AS user_name,
    u.tamil_name AS user_tamil_name,
    u.phone AS user_phone,
    u.address AS user_address,
    lt.type_name AS loan_type_name 
    FROM loans AS l JOIN users AS u 
    ON l.user_id=u.user_id 
    JOIN loan_types AS lt 
    ON l.loan_type = lt.loan_type_id`
  );
  return rows;
};

const getLoanById = async (loan_id) => {
  const [rows] = await db.query(
    `SELECT 
    l.*, 
    u.name AS user_name,
    u.tamil_name AS user_tamil_name,
    u.phone AS user_phone,
    u.address AS user_address,
    lt.type_name AS loan_type_name 
    FROM loans AS l JOIN users AS u 
    ON l.user_id=u.user_id 
    JOIN loan_types AS lt 
    ON l.loan_type = lt.loan_type_id 
    WHERE l.loan_id=?`,
    [loan_id]
  );
  return rows;
};

module.exports = {
  getAllLoans,
  getLoanById,
};
