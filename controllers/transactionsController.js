const transactionsService = require("../services/transactionsService");

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionsService.getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};
exports.getTransactionById = async (req, res, next) => {
  try {
    const transaction = await transactionsService.getTransactionById(
      req.params.transaction_id
    );
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};
exports.createTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionsService.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};
exports.updateTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionsService.updateTransactions({
      ...req.body,
      update_transactions_id: req.params.transactions_id,
    });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};
exports.deleteTransactionsById = async (req, res, next) => {
  try {
    const transactions = await transactionsService.deleteTransactionsById(
      req.params.transactions_id
    );
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};
