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

const createLoan = async (loan) => {
  const {
    user_id,
    amount,
    interest_rate,
    loan_type,
    loan_created,
    start_date,
    end_date,
    next_due_date,
    balance,
    profit,
    status,
  } = loan;
  console.log(loan);
  const [result] = await db.query(
    `INSERT INTO loans (
    user_id, 
    amount,
    interest_rate,
    loan_type,
    loan_created,
    start_date,
    end_date,
    next_due_date,
    balance,
    profit,
    status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      user_id,
      amount,
      interest_rate,
      loan_type,
      loan_created,
      start_date,
      end_date,
      next_due_date,
      balance,
      profit,
      status,
    ]
  );
  console.log(result);
  return {
    loan_id: result.insertId,
    ...loan,
  };
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
};
