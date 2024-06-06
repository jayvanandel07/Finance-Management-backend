const db = require("../config/db");
const { transactionType } = require("../constants/enums");
const HttpError = require("../utils/httpError");

const getAllTransactions = async () => {
  const [rows] = await db.query(
    `SELECT 
    t.*, 
    a.user_id,
    a.balance AS account_balance,
    u.name AS user_name,
    u.tamil_name AS user_tamil_name,
    u.alias AD u.user_alias,
    u.phone AS user_phone,
    u.address AS user_address
    FROM transactions AS t 
    JOIN accounts AS a
    ON t.account_no=a.account_no 
    JOIN users AS u ON a.user_id=u.user_id WHERE t.is_deleted=0`
  );
  return rows;
};

const getTransactionById = async (transaction_id) => {
  const [rows] = await db.query(
    `SELECT 
    t.*, 
    a.user_id,
    a.balance AS account_balance,
    u.name AS user_name,
    u.tamil_name AS user_tamil_name,
    u.alias AD u.user_alias,
    u.phone AS user_phone,
    u.address AS user_address
    FROM transactions AS t 
    JOIN accounts AS a
    ON t.account_no=a.account_no 
    JOIN users AS u ON a.user_id=u.user_id WHERE  t.transaction_id=? AND t.is_deleted=0 `,
    [transaction_id]
  );
  return rows;
};

const createTransaction = async (transaction) => {
  const {
    account_no,
    amount,
    transaction_type,
    transaction_date,
    description,
  } = transaction;
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO transactions (
        account_no, amount, transaction_type, transaction_date, description) VALUES (?,?,?,?,?)`,
      [account_no, amount, transaction_type, transaction_date, description]
    );

    await conn.query(
      `UPDATE accounts SET balance=balance${
        transaction_type === transactionType.CREDIT ? "+" : "-"
      }? where account_no=?`,
      [amount, account_no]
    );
    const [newTransaction] = await conn.query(
      "SELECT * FROM transactions WHERE transaction_id=?",
      [result.insertId]
    );
    const [updatedAccount] = await conn.query(
      "SELECT * FROM accounts WHERE account_no=?",
      [account_no]
    );
    await conn.commit();

    return {
      new_transaction: newTransaction,
      updated_account: updatedAccount,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
};
