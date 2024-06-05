const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getUsers = async () => {
  const [rows] = await db.query(
    `SELECT u.*, ut.type_name AS user_type_name FROM 
    users AS u 
    JOIN user_types ut 
    ON u.user_type_id = ut.user_type_id 
    WHERE u.is_deleted=0`
  );
  return rows;
};

const getUserById = async (user_id) => {
  const [result] = await db.query(
    `SELECT u.*,ut.type_name AS user_type_name FROM 
    users AS u 
    JOIN user_types ut 
    ON u.user_type_id = ut.user_type_id 
    WHERE user_id=? AND u.is_deleted=0`,
    [user_id]
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
    user_type_id,
  } = user;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [existingUser] = await conn.query(
      "SELECT 1 FROM users WHERE user_id = ?",
      [user_id]
    );

    if (existingUser.length > 0) {
      throw new HttpError("User already Exists", 409);
    }

    const [result] = await conn.query(
      "INSERT INTO users (user_id, name, tamil_name, alias, email, phone, address, cibil, user_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        name,
        tamil_name,
        alias,
        email,
        phone,
        address,
        cibil,
        user_type_id,
      ]
    );

    await conn.commit();

    const [newUser] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);

    return newUser;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
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
    user_type_id,
    update_user_id,
  } = user;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [existingUser] = await conn.query(
      "SELECT * FROM users WHERE user_id = ?",
      [update_user_id]
    );

    if (existingUser.length === 0) {
      throw new HttpError("User does not Exist", 404);
    }

    const updatedFields = {
      user_id: user_id ?? existingUser[0].user_id,
      name: name ?? existingUser[0].name,
      tamil_name: tamil_name ?? existingUser[0].tamil_name,
      alias: alias ?? existingUser[0].alias,
      email: email ?? existingUser[0].email,
      phone: phone ?? existingUser[0].phone,
      address: address ?? existingUser[0].address,
      cibil: cibil ?? existingUser[0].cibil,
      user_type_id: user_type_id ?? existingUser[0].user_type_id,
    };

    // Update the user
    await conn.query(
      "UPDATE users SET user_id=?, name=?, tamil_name=?, alias=?, email=?, phone=?, address=?, cibil=?, user_type_id=? WHERE user_id=?",
      [
        updatedFields.user_id,
        updatedFields.name,
        updatedFields.tamil_name,
        updatedFields.alias,
        updatedFields.email,
        updatedFields.phone,
        updatedFields.address,
        updatedFields.cibil,
        updatedFields.user_type_id,
        update_user_id,
      ]
    );

    // Fetch the updated user
    const [updatedUser] = await conn.query(
      "SELECT * FROM users WHERE user_id = ?",
      [updatedFields.user_id]
    );
    await conn.commit();
    return { message: "User Updated!", user: updatedUser };
  } catch (error) {
    await conn.rollback();
    if (error.code === "ER_DUP_ENTRY") {
      throw new HttpError("user id already exists!", 409);
    }
    throw error;
  } finally {
    conn.release();
  }
};

const deleteUser = async (user_id) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [user] = await conn.query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);
    if (user.length === 0) {
      throw new HttpError("User does not Exist", 404);
    }
    const [deleteUser] = await conn.query(
      "UPDATE users SET is_deleted=1 WHERE user_id=?",
      [user_id]
    );
    const [deleteLoans] = await conn.query(
      "UPDATE loans SET is_deleted=1 WHERE user_id=?",
      [user_id]
    );
    const [deleteAccounts] = await conn.query(
      "UPDATE accounts SET is_deleted=1 WHERE user_id=?",
      [user_id]
    );
    await conn.commit();
    const [deletedUser] = await conn.query(
      "SELECT * FROM users WHERE user_id = ?",
      [user_id]
    );
    const [deletedLoans] = await conn.query(
      "SELECT * FROM loans WHERE user_id = ?",
      [user_id]
    );
    const [deletedAccounts] = await conn.query(
      "SELECT * FROM accounts WHERE user_id = ?",
      [user_id]
    );
    return {
      message: "user successfully deleted!",
      user_deleted: deletedUser,
      loans_deleted: deletedLoans,
      accounts_deleted: deletedAccounts,
    };
  } catch (error) {
    await conn.rollback();

    throw error;
  } finally {
    conn.release();
  }
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
