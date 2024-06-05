const loanTypesModel = require("../models/loanTypesModel");

const getAllLoanTypes = async () => {
  return await loanTypesModel.getAllLoanTypes();
};
const getLoanTypeById = async (loan_type_id) => {
  return await loanTypesModel.getLoanTypeById(loan_type_id);
};
const createLoanType = async (loan_type) => {
  return await loanTypesModel.createLoanType(loan_type);
};
const updateLoanType = async (loan_type) => {
  return await loanTypesModel.updateLoanType(loan_type);
};
const deleteLoanType = async (loan_type_id) => {
  return await loanTypesModel.deleteLoanType(loan_type_id);
};

module.exports = {
  getAllLoanTypes,
  getLoanTypeById,
  createLoanType,
  updateLoanType,
  deleteLoanType,
};
