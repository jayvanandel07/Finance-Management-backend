const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getAllUserTypes = async () => {
  const [result] = await db.query("SELECT * FROM user_types");
  return result;
};
const getUserTypeByName = async (type_name) => {
  const [result] = await db.query(
    "SELECT * FROM user_types WHERE type_name=?",
    [type_name]
  );
  return result;
};

const createUserType = async (user_type) => {
  const { type_name } = user_type;
  const [existingUserType] = await db.query(
    "SELECT * FROM user_types WHERE type_name = ?",
    [type_name]
  );
  if (existingUserType.length > 0) {
    throw new HttpError("User Type already Exists", 409);
  }
  const [result] = await db.query(
    "INSERT INTO user_types (type_name) VALUES ( ?)",
    [type_name]
  );
  return { user_type_id: result.insertId, ...user_type };
};

const updateUserType = async (user_type) => {
  const { type_name, updated_type_name } = user_type;
  const [existingUserType] = await db.query(
    "SELECT * FROM user_types WHERE type_name = ?",
    [type_name]
  );
  if (existingUserType.length === 0) {
    throw new HttpError("User Type does not Exist", 404);
  }
  const [result] = await db.query(
    "UPDATE user_types SET type_name=? WHERE type_name=?",
    [updated_type_name, type_name]
  );

  return {
    user_type_id: existingUserType[0].user_type_id,
    type_name: updated_type_name,
  };
};

const deleteUserType = async (user_type) => {
  const { type_name } = user_type;
  const [existingUserType] = await db.query(
    "SELECT * FROM user_types WHERE type_name = ?",
    [type_name]
  );
  if (existingUserType.length === 0) {
    throw new HttpError("User Type does not Exist", 404);
  }
  try {
    const [result] = await db.query(
      "DELETE FROM user_types WHERE type_name=?",
      [type_name]
    );

    return {
      message: "user type successfully deleted!",
      user_type_deleted: {
        user_type_id: existingUserType[0].user_type_id,
        type_name: type_name,
      },
    };
  } catch (error) {
    console.log("console:", error);
    if (error.sqlMessage.includes("foreign key constraint")) {
      return {
        status: 400,
        message: "Cannot delete user due to foreign key constraint",
      };
    }
    throw error;
  }
};
module.exports = {
  getAllUserTypes,
  getUserTypeByName,
  createUserType,
  updateUserType,
  deleteUserType,
};
