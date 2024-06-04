const loansModel = require("../models/loansModel");

const getAllLoans = async () => {
  return await loansModel.getAllLoans();
};
const getLoanById = async (loan_id) => {
  return await loansModel.getLoanById(loan_id);
};
const createLoan = async (loan) => {
  return await loansModel.createLoan(loan);
};
const updateLoan = async (loan) => {
  return await loansModel.updateLoan(loan);
};
const deleteLoanById = async (loan_id) => {
  return await loansModel.deleteLoanById(loan_id);
};

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoanById,
};
