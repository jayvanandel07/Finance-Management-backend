const loansModel = require("../models/loansModel");

const getAllLoans = async () => {
  return await loansModel.getAllLoans();
};
const getLoanById = async (loan_id) => {
  return await loansModel.getLoanById(loan_id);
};

module.exports = {
  getAllLoans,
  getLoanById,
};
