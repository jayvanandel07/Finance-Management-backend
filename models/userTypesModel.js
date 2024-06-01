const db = require("../config/db");
const HttpError = require("../utils/httpError");

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
  return { id: result.insertId, ...user_type };
};

module.exports = {
  createUserType,
};
