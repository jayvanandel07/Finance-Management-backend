const accountsModel = require("../models/accountsModel");

const getAllAccounts = async () => {
  return await accountsModel.getAllAccounts();
};
const getAccountsByAccountNo = async (account_no) => {
  return await accountsModel.getAccountsByAccountNo(account_no);
};
const getAccountsByUserId = async (user_id) => {
  return await accountsModel.getAccountsByUserId(user_id);
};

const createAccount = async (account) => {
  return await accountsModel.createAccount(account);
};
const updateAccount = async (account) => {
  return await accountsModel.updateAccount(account);
};
const deleteAccount = async (account_no) => {
  return await accountsModel.deleteAccount(account_no);
};

module.exports = {
  getAllAccounts,
  getAccountsByAccountNo,
  getAccountsByUserId,
  createAccount,
  updateAccount,
  deleteAccount,
};
