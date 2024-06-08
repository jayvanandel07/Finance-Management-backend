const db = require("../config/db");
const { transactionType } = require("../constants/enums");
const HttpError = require("../utils/httpError");

const getAllPayments = async () => {
  const [rows] = await db.query(
    `SELECT 
    *
    FROM payments AS p
    JOIN loans AS l
    ON p.loan_id=l.loan_id 
    JOIN transactions AS t 
    ON p.transaction_id=t.transaction_id 
    WHERE p.is_deleted=0`
  );
  return rows;
};

const getPaymentById = async (transaction_id) => {
  const [rows] = await db.query(
    `SELECT 
    *
    FROM payments AS p
    JOIN loans AS l
    ON p.loan_id=l.loan_id 
    JOIN transactions AS t 
    ON p.transaction_id=t.transaction_id 
    WHERE  p.payment_id=? AND p.is_deleted=0 `,
    [transaction_id]
  );
  return rows;
};

const createPayment = async (payment) => {
  const { transaction, loan_id, amount, payment_date } = payment;

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();
    const [newTransactionQuery] = await conn.query(
      `INSERT INTO transactions (
        account_no, amount, transaction_type, transaction_date, description) VALUES (?,?,?,?,?)`,
      [
        transaction.account_no,
        amount,
        transaction.transaction_type,
        payment_date,
        transaction.description,
      ]
    );
    const [updateAccountQuery] = await conn.query(
      `UPDATE accounts SET  balance=balance ${
        transaction.transaction_type === transactionType.CREDIT ? "+" : "-"
      } ? WHERE account_no=?`,
      [amount, transaction.account_no]
    );
    const [result] = await conn.query(
      `INSERT INTO payments (
        transaction_id, loan_id, amount, payment_date) VALUES (?,?,?,?)`,
      [newTransactionQuery.insertId, loan_id, amount, payment_date]
    );

    const [newTransaction] = await conn.query(
      "SELECT * FROM transactions WHERE transaction_id=?",
      [newTransactionQuery.insertId]
    );
    const [updatedAccount] = await conn.query(
      "SELECT * FROM accounts WHERE account_no=?",
      [transaction.account_no]
    );
    const [newPayment] = await conn.query(
      "SELECT * FROM payments WHERE payment_id=?",
      [result.insertId]
    );
    await conn.commit();

    return {
      payment: newPayment,
      updated_account: updatedAccount,
      transaction: newTransaction,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
};
