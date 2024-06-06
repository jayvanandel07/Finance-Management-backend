const accountsService = require("../services/accountsService");

exports.getAllAccounts = async (req, res, next) => {
  try {
    const accounts = await accountsService.getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};
exports.getAccountsByAccountNo = async (req, res, next) => {
  try {
    const accounts = await accountsService.getAccountsByAccountNo(
      req.params.account_no
    );
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};
exports.getAccountsByUserId = async (req, res, next) => {
  try {
    const accounts = await accountsService.getAccountsByUserId(
      req.params.user_id
    );
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
};
exports.createAccount = async (req, res, next) => {
  try {
    const account = await accountsService.createAccount(req.body);
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
exports.updateAccount = async (req, res, next) => {
  try {
    const account = await accountsService.updateAccount({
      update_account_no: req.params.account_no,
      ...req.body,
    });
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
exports.deleteAccount = async (req, res, next) => {
  try {
    const account = await accountsService.deleteAccount(req.params.account_no);
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
};
