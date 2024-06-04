const transactionsModel = require("../models/transactionsModel");

const getAllTransactions = async () => {
  return await transactionsModel.getAllTransactions();
};

const getTransactionById = async (transaction_id) => {
  return await transactionsModel.getTransactionById(transaction_id);
};

const createTransaction = async (transactions) => {
  return await transactionsModel.createTransaction(transactions);
};
const updateTransaction = async (transactions) => {
  return await transactionsModel.updateTransaction(transactions);
};
const deleteTransactionById = async (transactions_id) => {
  return await transactionsModel.deleteTransactionById(transactions_id);
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransactionById,
};
