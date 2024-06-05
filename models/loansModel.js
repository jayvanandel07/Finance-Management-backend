const db = require("../config/db");
const {
  splitFrequencyString,
  calculateStartDate,
  calculateEndDate,
  calculateNextDueDate,
} = require("../utils/common.service");
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
    ON l.loan_type_id = lt.loan_type_id
    WHERE l.is_deleted=0`
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
    ON l.loan_type_id = lt.loan_type_id 
    WHERE l.loan_id=? AND l.is_deleted=0`,
    [loan_id]
  );
  return rows;
};

const createLoan = async (loan) => {
  const {
    account_no,
    user_id,
    amount,
    interest_rate,
    loan_type_id,
    loan_created,
    loan_date,
    start_date,
    due_frequency,
    due_tenure,
  } = loan;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const { frequency, frequencyType } = await splitFrequencyString(
      due_frequency
    );
    const calculatedStartDate =
      start_date ??
      (await calculateStartDate(loan_date, frequency, frequencyType));

    const calculatedEndDate = await calculateEndDate(
      calculatedStartDate,
      due_tenure,
      frequency,
      frequencyType
    );
    const calculatedNextDueDate = await calculateNextDueDate(
      frequency,
      frequencyType,
      calculatedStartDate,
      calculatedEndDate
    );

    const updatedFields = {
      start_date: calculatedStartDate,
      end_date: calculatedEndDate,
      next_due_date: calculatedNextDueDate,
      balance: amount,
      status: "active",
    };
    const [result] = await conn.query(
      `INSERT INTO loans (
    user_id, 
    amount,
    interest_rate,
    loan_type_id,
    loan_created,
    loan_date,
    start_date,
    end_date,
    next_due_date,
    balance,
    status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        user_id,
        amount,
        interest_rate,
        loan_type_id,
        loan_created,
        loan_date,
        updatedFields.start_date,
        updatedFields.end_date,
        updatedFields.next_due_date,
        updatedFields.balance,
        updatedFields.status,
      ]
    );

    const [updateAccount] = await conn.query(
      `UPDATE accounts SET balance=balance - ? WHERE account_no=?`,
      [amount, account_no]
    );
    const [newLoan] = await conn.query("SELECT * FROM loans WHERE loan_id=?", [
      result.insertId,
    ]);

    await conn.commit();
    return newLoan;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const updateLoan = async (loan) => {
  const {
    loan_id,
    account_no,
    user_id,
    amount,
    interest_rate,
    loan_type_id,
    loan_created,
    loan_date,
    start_date,
    balance,
    due_frequency,
    due_tenure,
  } = loan;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [existingLoan] = await conn.query(
      "SELECT * FROM loans WHERE loan_id in (?)",
      [loan_id]
    );

    if (existingLoan.length === 0) {
      throw new HttpError("Loan does not Exist", 404);
    }
    const { frequency, frequencyType } = await splitFrequencyString(
      due_frequency
    );
    const calculatedStartDate =
      start_date ??
      (await calculateStartDate(loan_date, frequency, frequencyType));

    const calculatedEndDate = await calculateEndDate(
      calculatedStartDate,
      due_tenure,
      frequency,
      frequencyType
    );
    const calculatedNextDueDate = await calculateNextDueDate(
      frequency,
      frequencyType,
      calculatedStartDate,
      calculatedEndDate
    );
    const updatedFields = {
      start_date: calculatedStartDate,
      end_date: calculatedEndDate,
      next_due_date: calculatedNextDueDate,
      balance:
        existingLoan[0].balance +
        ((amount ?? existingLoan[0].amount) - existingLoan[0].amount),
    };

    const [loans] = await conn.query(
      `UPDATE loans SET 
      user_id=?, 
      amount=?,
      interest_rate=?,
      loan_type_id=?,
      loan_created=?,
      loan_date=?,
      start_date=?,
      end_date=?,
      next_due_date=?,
      balance=? 
      WHERE loan_id=?`,
      [
        user_id ?? existingLoan[0].user_id,
        amount ?? existingLoan[0].amount,
        interest_rate ?? existingLoan[0].interest_rate,
        loan_type_id ?? existingLoan[0].loan_type_id,
        loan_created ?? existingLoan[0].loan_created,
        loan_date ?? existingLoan[0].loan_date,
        updatedFields.start_date,
        updatedFields.end_date,
        updatedFields.next_due_date,
        updatedFields.balance,
        loan_id,
      ]
    );
    const [updateAccount] = await conn.query(
      `UPDATE accounts SET balance=balance - ? WHERE account_no=?`,
      [(amount ?? existingLoan[0].amount) - existingLoan[0].amount, account_no]
    );
    const [updatedLoan] = await conn.query(
      "SELECT * FROM loans WHERE loan_id=?",
      [loan_id]
    );
    await conn.commit();
    return {
      message: "Loan updated Successfully",
      loan_updated: updatedLoan,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
const deleteLoan = async (loan_id) => {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();
    const [loans] = await conn.query("SELECT * FROM loans WHERE loan_id = ?", [
      loan_id,
    ]);
    if (loans.length === 0) {
      throw new HttpError("loan does not Exist", 404);
    }

    const [deleteLoan] = await conn.query(
      "UPDATE loans SET is_deleted=1 WHERE loan_id=?",
      [loan_id]
    );
    const [deletePayments] = await conn.query(
      "UPDATE payments SET is_deleted=1 WHERE loan_id=?",
      [loan_id]
    );
    const [deletedLoan] = await conn.query(
      "SELECT * FROM loans WHERE loan_id=?",
      [loan_id]
    );
    const [deletedPayments] = await conn.query(
      "SELECT * FROM payments WHERE loan_id=?",
      [loan_id]
    );
    await conn.commit();
    return {
      message: "loan successfully deleted!",
      loan_deleted: deletedLoan,
      payments_deleted: deletedPayments,
    };
  } catch (error) {
    await conn.rollback();

    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
};
