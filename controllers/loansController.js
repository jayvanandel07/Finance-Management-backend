const loansService = require("../services/loansService");

exports.getAllLoans = async (req, res, next) => {
  try {
    const loans = await loansService.getAllLoans();
    res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
};

exports.getLoanById = async (req, res, next) => {
  try {
    const loan = await loansService.getLoanById(req.params.loan_id);
    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};
exports.createLoan = async (req, res, next) => {
  try {
    const loan = await loansService.createLoan(req.body);
    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};
exports.updateLoan = async (req, res, next) => {
  try {
    const loan = await loansService.updateLoan({
      loan_id: parseInt(req.params.loan_id),
      ...req.body,
    });
    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};
exports.deleteLoanById = async (req, res, next) => {
  try {
    const loan = await loansService.deleteLoanById(
      parseInt(req.params.loan_id)
    );
    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};
