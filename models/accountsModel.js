const db = require("../config/db");
const HttpError = require("../utils/httpError");

const getAllAccounts = async () => {
  const [result] = await db.query(
    `SELECT 
    a.*,
    u.name AS user_name,
    u.tamil_name AS user_tamil_name,
    u.alias AS user_alias, 
    u.email AS user_email,
    u.phone AS user_phone, 
    u.address AS user_address 
    FROM accounts AS a JOIN users AS u ON a.user_id=u.user_id WHERE a.is_deleted=0`
  );
  return result;
};
const getAccountsByAccountNo = async (account_no) => {
  const [result] = await db.query(
    `SELECT 
    a.*,
    u.name AS user_name,
    u.tamil_name AS user_tamil_name,
    u.alias AS user_alias, 
    u.email AS user_email,
    u.phone AS user_phone, 
    u.address AS user_address  
    FROM accounts AS a JOIN users AS u ON a.user_id=u.user_id WHERE a.account_no=? AND a.is_deleted=0`,
    [account_no]
  );
  return result;
};
const getAccountsByUserId = async (user_id) => {
  const [result] = await db.query(
    `SELECT 
    a.*,
    u.name AS user_name,
    u.tamil_name AS user_tamil_name,
    u.alias AS user_alias, 
    u.email AS user_email,
    u.phone AS user_phone, 
    u.address AS user_address  
    FROM accounts AS a JOIN users AS u ON a.user_id=u.user_id WHERE a.user_id=? AND a.is_deleted=0`,
    [user_id]
  );
  return result;
};

const createAccount = async (account) => {
  const { account_no, name, user_id, balance } = account;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [existingAccount] = await conn.query(
      "SELECT 1 FROM accounts WHERE account_no = ?",
      [account_no]
    );

    if (existingAccount.length > 0) {
      throw new HttpError("Account already Exists", 409);
    }

    const [result] = await conn.query(
      "INSERT INTO accounts (account_no, name, user_id, balance) VALUES (?, ?, ?, ?)",
      [account_no, name, user_id, balance]
    );

    await conn.commit();

    const [newAccount] = await db.query(
      "SELECT * FROM accounts WHERE account_no = ?",
      [account_no]
    );

    return newAccount;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

const updateAccount = async (account) => {
  const { account_no, user_id, balance, update_account_no } = account;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [existingAccount] = await conn.query(
      "SELECT * FROM accounts WHERE account_no = ?",
      [update_account_no]
    );

    if (existingAccount.length === 0) {
      throw new HttpError("Account does not Exists", 404);
    }
    const updatedFields = {
      account_no: account_no ?? existingAccount[0].account_no,
      user_id: user_id ?? existingAccount[0].user_id,
      balance: balance ?? existingAccount[0].balance,
      update_account_no,
    };
    await conn.query(
      "UPDATE accounts SET account_no=?, user_id=?, balance=? WHERE account_no=?",
      [
        updatedFields.account_no,
        updatedFields.user_id,
        updatedFields.balance,
        updatedFields.update_account_no,
      ]
    );
    const [updateAccount] = await conn.query(
      "SELECT * FROM accounts WHERE account_no = ?",
      [updatedFields.account_no]
    );
    await conn.commit();

    return { message: "account Updated!", account: updateAccount };
  } catch (error) {
    await conn.rollback();
    if (error.code === "ER_DUP_ENTRY") {
      throw new HttpError("new account_no already exists!", 409);
    }
    throw error;
  } finally {
    conn.release();
  }
};
const deleteAccount = async (account_no) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [accounts] = await conn.query(
      "SELECT * FROM accounts WHERE account_no = ?",
      [account_no]
    );
    if (accounts.length === 0) {
      throw new HttpError("Account does not Exist", 404);
    }

    const [deleteAccounts] = await conn.query(
      "UPDATE accounts SET is_deleted=1 WHERE account_no=?",
      [account_no]
    );
    await conn.commit();

    const [deletedAccounts] = await conn.query(
      "SELECT * FROM accounts WHERE account_no = ?",
      [account_no]
    );
    return {
      message: "account successfully deleted!",
      account_deleted: deletedAccounts,
    };
  } catch (error) {
    await conn.rollback();

    throw error;
  } finally {
    conn.release();
  }
};
module.exports = {
  getAllAccounts,
  getAccountsByAccountNo,
  getAccountsByUserId,
  createAccount,
  updateAccount,
  deleteAccount,
};
