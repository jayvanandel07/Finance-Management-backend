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

module.exports = {
  getAllLoans,
  getLoanById,
  createLoan,
};
