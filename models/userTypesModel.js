const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getAllUserTypes = async () => {
  const [result] = await db.query(
    "SELECT * FROM user_types WHERE is_deleted = 0"
  );
  return result;
};
const getUserTypeById = async (user_type_id) => {
  const [result] = await db.query(
    "SELECT * FROM user_types WHERE user_type_id=? AND is_deleted=0",
    [user_type_id]
  );
  return result;
};

const createUserType = async (user_type) => {
  const { type_name } = user_type;
  const conn = await db.getConnection();
  try {
    const [existingUserType] = await conn.query(
      "SELECT 1 FROM user_types WHERE type_name=? AND is_deleted=0",
      [type_name]
    );
    if (existingUserType.length > 0)
      throw new HttpError("User Type already Exists", 409);

    const [result] = await conn.query(
      "INSERT INTO user_types (type_name) VALUES (?)",
      [type_name]
    );
    await conn.commit();

    const [newUserType] = await conn.query(
      "SELECT * FROM user_types WHERE user_type_id=?",
      [result.insertId]
    );

    return newUserType;
  } catch (error) {
    await conn.rollback();

    throw error;
  } finally {
    conn.release();
  }
};

const updateUserType = async (user_type) => {
  const { user_type_id, type_name } = user_type;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [existingUserType] = await conn.query(
      "SELECT 1 FROM user_types WHERE user_type_id = ?",
      [user_type_id]
    );
    if (existingUserType.length === 0) {
      throw new HttpError("User Type does not Exist", 404);
    }
    const [result] = await conn.query(
      "UPDATE user_types SET type_name=? WHERE user_type_id=?",
      [type_name, user_type_id]
    );

    await conn.commit();
    const [updatedUserType] = await conn.query(
      "SELECT * FROM user_types WHERE user_type_id=?",
      [user_type_id]
    );

    return {
      message: "user type updated!",
      updated_user_type: updatedUserType,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const deleteUserType = async (user_type_id) => {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [existingUserType] = await conn.query(
      "SELECT * FROM user_types WHERE user_type_id = ?",
      [user_type_id]
    );
    if (existingUserType.length === 0) {
      throw new HttpError("User Type does not Exist", 404);
    }

    const [deleteUserType] = await conn.query(
      "UPDATE user_types SET is_deleted = 1 WHERE user_type_id=?",
      [user_type_id]
    );
    const [deleteUsers] = await conn.query(
      "UPDATE users SET is_deleted=1 WHERE user_type_id=?",
      [user_type_id]
    );

    await conn.commit();
    const [deletedUserType] = await conn.query(
      "SELECT * FROM user_types WHERE user_type_id=?",
      [user_type_id]
    );
    const [deletedUsers] = await conn.query(
      "SELECT * FROM users WHERE user_type_id=?",
      [user_type_id]
    );

    return {
      message: "user type successfully deleted!",
      user_type_deleted: deletedUserType,
      users_deleted: deletedUsers,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
module.exports = {
  getAllUserTypes,
  getUserTypeById,
  createUserType,
  updateUserType,
  deleteUserType,
};
