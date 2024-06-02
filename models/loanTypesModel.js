const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getAllLoanTypes = async () => {
  const [result] = await db.query("SELECT * FROM loan_types");
  return result;
};
const getLoanTypeByName = async (type_name) => {
  const [result] = await db.query(
    "SELECT * FROM loan_types WHERE type_name=?",
    [type_name]
  );
  return result;
};

const createLoanType = async (loan_type) => {
  const { type_name } = loan_type;
  const [existingLoanType] = await db.query(
    "SELECT * FROM loan_types WHERE type_name = ?",
    [type_name]
  );
  if (existingLoanType.length > 0) {
    throw new HttpError("Loan Type already Exists", 409);
  }
  const [result] = await db.query(
    "INSERT INTO loan_types (type_name) VALUES ( ?)",
    [type_name]
  );
  return { loan_type_id: result.insertId, ...loan_type };
};

const updateLoanType = async (loan_type) => {
  const { type_name, updated_type_name } = loan_type;
  const [existingLoanType] = await db.query(
    "SELECT * FROM loan_types WHERE type_name = ?",
    [type_name]
  );
  if (existingLoanType.length === 0) {
    throw new HttpError("loan Type does not Exist", 404);
  }
  const [result] = await db.query(
    "UPDATE loan_types SET type_name=? WHERE type_name=?",
    [updated_type_name, type_name]
  );

  return {
    message: "loan type updated!",
    updated_loan_type: {
      loan_type_id: existingLoanType[0].loan_type_id,
      type_name: updated_type_name,
    },
  };
};

const deleteLoanType = async (loan_type) => {
  const { type_name } = loan_type;
  const [existingLoanType] = await db.query(
    "SELECT * FROM loan_types WHERE type_name = ?",
    [type_name]
  );
  if (existingLoanType.length === 0) {
    throw new HttpError("Loan Type does not Exist", 404);
  }
  try {
    const [result] = await db.query(
      "DELETE FROM loan_types WHERE type_name=?",
      [type_name]
    );

    return {
      message: "loan type successfully deleted!",
      loan_type_deleted: {
        loan_type_id: existingLoanType[0].loan_type_id,
        type_name: type_name,
      },
    };
  } catch (error) {
    console.log("console:", error);
    if (error.sqlMessage.includes("foreign key constraint")) {
      throw new HttpError(
        "Cannot delete loan type due to foreign key constraint",
        400
      );
    }
    throw error;
  }
};
module.exports = {
  getAllLoanTypes,
  getLoanTypeByName,
  createLoanType,
  updateLoanType,
  deleteLoanType,
};
