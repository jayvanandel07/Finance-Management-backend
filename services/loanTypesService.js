const loanTypesModel = require("../models/loanTypesModel");

const getAllLoanTypes = async () => {
  return await loanTypesModel.getAllLoanTypes();
};
const getLoanTypeByName = async (type_name) => {
  return await loanTypesModel.getLoanTypeByName(type_name);
};
const createLoanType = async (loan_type) => {
  return await loanTypesModel.createLoanType(loan_type);
};
const updateLoanType = async (loan_type) => {
  return await loanTypesModel.updateLoanType(loan_type);
};
const deleteLoanType = async (loan_type) => {
  return await loanTypesModel.deleteLoanType(loan_type);
};

module.exports = {
  getAllLoanTypes,
  getLoanTypeByName,
  createLoanType,
  updateLoanType,
  deleteLoanType,
};
