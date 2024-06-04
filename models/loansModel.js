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

  return {
    loan_id: result.insertId,
    ...loan,
  };
};

const updateLoan = async (loan) => {
  const {
    loan_id,
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

  const [existingLoan] = await db.query(
    "SELECT * FROM loans WHERE loan_id in (?)",
    [loan_id]
  );

  if (existingLoan.length === 0) {
    throw new HttpError("Loan does not Exist", 404);
  }
  loan = {
    loan_id,
    user_id: user_id ?? existingLoan[0].user_id,
    amount: amount ?? existingLoan[0].amount,
    interest_rate: interest_rate ?? existingLoan[0].interest_rate,
    loan_type: loan_type ?? existingLoan[0].loan_type,
    loan_created: loan_created ?? existingLoan[0].loan_created,
    start_date: start_date ?? existingLoan[0].start_date,
    end_date: end_date ?? existingLoan[0].end_date,
    next_due_date: next_due_date ?? existingLoan[0].next_due_date,
    balance: balance ?? existingLoan[0].balance,
    profit: profit ?? existingLoan[0].profit,
    status: status ?? existingLoan[0].status,
  };
  const [loans] = await db.query(
    "UPDATE loans SET user_id=?, amount=?, interest_rate=?, loan_type=?, loan_created=?, start_date=?, end_date=?, next_due_date=?, balance=?, profit=?, status=? WHERE loan_id=?",
    [
      user_id ?? existingLoan[0].user_id,
      amount ?? existingLoan[0].amount,
      interest_rate ?? existingLoan[0].interest_rate,
      loan_type ?? existingLoan[0].loan_type,
      loan_created ?? existingLoan[0].loan_created,
      start_date ?? existingLoan[0].start_date,
      end_date ?? existingLoan[0].end_date,
      next_due_date ?? existingLoan[0].next_due_date,
      balance ?? existingLoan[0].balance,
      profit ?? existingLoan[0].profit,
      status ?? existingLoan[0].status,
      loan_id,
    ]
  );
  return {
    message: "Loan updated Successfully",
    loan_updated: loan,
  };
};
const deleteLoanById = async (loan_id) => {
  const [loans] = await db.query("SELECT * FROM loans WHERE loan_id = ?", [
    loan_id,
  ]);
  if (loans.length === 0) {
    throw new HttpError("loan does not Exist", 404);
  }
  try {
    const [result] = await db.query("DELETE FROM loans WHERE loan_id=?", [
      loan_id,
    ]);

    return {
      message: "loan successfully deleted!",
      loan_deleted: loans[0],
    };
  } catch (error) {
    console.log("console:", error);
    if (error.sqlMessage.includes("foreign key constraint")) {
      throw new HttpError(
        "Cannot delete loan due to foreign key constraint",
        400
      );
    }
    throw error;
  }
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoanById,
};
