const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

const getUserByIdOrName = async (user) => {
  const searchPattern = `%${user}%`;
  const [result] = await db.query(
    "SELECT * FROM users WHERE CAST(user_id AS CHAR) LIKE ? OR name LIKE ? OR tamil_name LIKE ?",
    [searchPattern, searchPattern, searchPattern]
  );
  return result;
};

const createUser = async (user) => {
  const {
    user_id,
    name,
    tamil_name,
    alias,
    email,
    phone,
    address,
    cibil,
    user_type,
  } = user;
  const [existingUser] = await db.query(
    "SELECT * FROM users WHERE user_id = ?",
    [user_id]
  );
  if (existingUser.length > 0) {
    throw new HttpError("User already Exists", 409);
  }
  const [result] = await db.query(
    "INSERT INTO users (user_id, name, tamil_name, alias, email, phone, address, cibil, user_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user_id,
      name,
      tamil_name ?? "",
      alias ?? "",
      email ?? "",
      phone ?? "",
      address ?? "",
      cibil ?? "",
      user_type,
    ]
  );
  return user;
};
const updateUser = async (user) => {
  const {
    user_id,
    name,
    tamil_name,
    alias,
    email,
    phone,
    address,
    cibil,
    user_type,
    update_user_id,
  } = user;
  const [existingUser] = await db.query(
    "SELECT * FROM users WHERE user_id = ?",
    [update_user_id]
  );

  if (existingUser.length === 0) {
    throw new HttpError("User does not Exist", 404);
  }
  user = {
    user_id: user_id ?? existingUser[0].user_id,
    name: name ?? existingUser[0].name,
    tamil_name: tamil_name ?? existingUser[0].tamil_name,
    alias: alias ?? existingUser[0].alias,
    email: email ?? existingUser[0].email,
    phone: phone ?? existingUser[0].phone,
    address: address ?? existingUser[0].address,
    cibil: cibil ?? existingUser[0].cibil,
    user_type: user_type ?? existingUser[0].user_type,
    updated_user_id: update_user_id,
  };
  try {
    const [result] = await db.query(
      "UPDATE users SET user_id=?, name=?, tamil_name=?, alias=?, email=?, phone=?, address=?, cibil=?, user_type=? WHERE user_id=?",
      [
        user_id ?? existingUser[0].user_id,
        name ?? existingUser[0].name,
        tamil_name ?? existingUser[0].tamil_name,
        alias ?? existingUser[0].alias,
        email ?? existingUser[0].email,
        phone ?? existingUser[0].phone,
        address ?? existingUser[0].address,
        cibil ?? existingUser[0].cibil,
        user_type ?? existingUser[0].user_type,
        update_user_id,
      ]
    );
    return { message: "User Updated!", user };
  } catch (error) {
    if (error.sqlMessage.includes("Duplicate entry")) {
      throw new HttpError("user id already exists!", 409);
    }
    throw error;
  }
};

const deleteUserById = async (user_id) => {
  const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [
    user_id,
  ]);
  if (user.length === 0) {
    throw new HttpError("User does not Exist", 404);
  }
  try {
    const [result] = await db.query("DELETE FROM users WHERE user_id=?", [
      user_id,
    ]);

    return {
      message: "user successfully deleted!",
      user_deleted: user,
    };
  } catch (error) {
    console.log("console:", error);
    if (error.sqlMessage.includes("foreign key constraint")) {
      throw new HttpError(
        "Cannot delete user due to foreign key constraint",
        400
      );
    }
    throw error;
  }
};
module.exports = {
  getUsers,
  getUserByIdOrName,
  createUser,
  updateUser,
  deleteUserById,
};
