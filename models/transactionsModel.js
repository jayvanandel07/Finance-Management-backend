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

const getTransactionById = async (transaction_id) => {
  const [rows] = await db.query(
    `SELECT 
      t.*, 
      u.name AS user_name,
      u.tamil_name AS user_tamil_name,
      u.phone AS user_phone,
      u.address AS user_address
      FROM transactions AS t JOIN users AS u 
      ON t.user_id=u.user_id  
      WHERE t.transaction_id=?`,
    [transaction_id]
  );
  return rows;
};

const createTransaction = async (transaction) => {
  const { user_id, amount, transaction_type, transaction_date, description } =
    transaction;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO transactions (
        user_id, amount, transaction_type, transaction_date, description) VALUES (?,?,?,?,?)`,
      [user_id, amount, transaction_type, transaction_date, description]
    );

    await connection.query(
      `UPDATE accounts SET balance=balance${
        transaction_type === "deposit" ? "+" : "-"
      }? where account_no=?`,
      [amount, account_no]
    );

    await connection.commit();

    return {
      transaction_id: result.insertId,
      ...transaction,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
};
