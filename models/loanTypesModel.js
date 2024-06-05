const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getAllLoanTypes = async () => {
  const [result] = await db.query(
    "SELECT * FROM loan_types WHERE is_deleted=0"
  );
  return result;
};
const getLoanTypeById = async (loan_type_id) => {
  const [result] = await db.query(
    "SELECT * FROM loan_types WHERE loan_type_id=? AND is_deleted=0",
    [loan_type_id]
  );
  return result;
};

const createLoanType = async (loan_type) => {
  const { type_name, interest_rate, tenure, frequency } = loan_type;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [existingLoanType] = await conn.query(
      "SELECT 1 FROM loan_types WHERE type_name = ? and is_deleted=0",
      [type_name]
    );
    if (existingLoanType.length > 0) {
      throw new HttpError("Loan Type already Exists", 409);
    }
    const [result] = await conn.query(
      "INSERT INTO loan_types (type_name,interest_rate,tenure,frequency) VALUES (?,?,?,?)",
      [type_name, interest_rate, tenure, frequency]
    );

    await conn.commit();

    const [newLoanType] = await conn.query(
      "SELECT * FROM loan_types WHERE loan_type_id=?",
      [result.insertId]
    );
    return newLoanType;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const updateLoanType = async (loan_type) => {
  const { loan_type_id, type_name, interest_rate, tenure } = loan_type;
  const conn = await db.getConnection();
  try {
    const [existingLoanType] = await conn.query(
      "SELECT * FROM loan_types WHERE loan_type_id = ?",
      [loan_type_id]
    );
    if (existingLoanType.length === 0) {
      throw new HttpError("loan Type does not Exist", 404);
    }
    const updatedFields = {
      type_name: type_name ?? existingLoanType[0].type_name,
      interest_rate: interest_rate ?? existingLoanType[0].interest_rate,
      tenure: tenure ?? existingLoanType[0].tenure,
      frequency: frequency ?? existingLoanType[0].frequency,
    };
    const [result] = await conn.query(
      "UPDATE loan_types SET type_name=?,interest_rate=?,tenure=?,frequency=? WHERE loan_type_id=?",
      [
        updatedFields.type_name,
        updatedFields.interest_rate,
        updatedFields.tenure,
        updatedFields.frequency,
        loan_type_id,
      ]
    );
    await conn.commit();
    const [updatedLoanType] = await conn.query(
      "SELECT * FROM loan_types WHERE loan_type_id=?",
      [loan_type_id]
    );

    return {
      message: "loan type updated!",
      updated_loan_type: updatedLoanType,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const deleteLoanType = async (loan_type_id) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [existingLoanType] = await conn.query(
      "SELECT * FROM loan_types WHERE loan_type_id = ?",
      [loan_type_id]
    );
    if (existingLoanType.length === 0) {
      throw new HttpError("Loan Type does not Exist", 404);
    }

    const [deleteLoanType] = await conn.query(
      "UPDATE loan_types SET is_deleted=1 WHERE loan_type_id=?",
      [loan_type_id]
    );
    const [deleteLoans] = await conn.query(
      "UPDATE loans SET is_deleted=1 WHERE loan_type_id=?",
      [loan_type_id]
    );

    await conn.commit();

    const [deletedLoanType] = await conn.query(
      "SELECT * FROM loan_types WHERE loan_type_id=?",
      [loan_type_id]
    );
    const [deletedLoans] = await conn.query(
      "SELECT * FROM loans WHERE loan_type_id=?",
      [loan_type_id]
    );

    return {
      message: "loan type successfully deleted!",
      loan_type_deleted: deletedLoanType,
      loans_deleted: deletedLoans,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
module.exports = {
  getAllLoanTypes,
  getLoanTypeById,
  createLoanType,
  updateLoanType,
  deleteLoanType,
};
