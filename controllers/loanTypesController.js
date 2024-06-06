const loanTypesService = require("../services/loanTypesService");

exports.getAllLoanTypes = async (req, res, next) => {
  try {
    const loanTypes = await loanTypesService.getAllLoanTypes();
    res.status(200).json(loanTypes);
  } catch (error) {
    next(error);
  }
};
exports.getLoanTypeById = async (req, res, next) => {
  try {
    const loanType = await loanTypesService.getLoanTypeById(
      req.params.loan_type_id
    );
    res.status(200).json(loanType);
  } catch (error) {
    next(error);
  }
};

exports.createLoanType = async (req, res, next) => {
  try {
    const loanType = await loanTypesService.createLoanType(req.body);
    res.status(201).json(loanType);
  } catch (error) {
    next(error);
  }
};

exports.updateLoanType = async (req, res, next) => {
  try {
    const updatedLoanType = await loanTypesService.updateLoanType({
      loan_type_id: req.params.loan_type_id,
      ...req.body,
    });
    res.status(200).json(updatedLoanType);
  } catch (error) {
    next(error);
  }
};
exports.deleteLoanType = async (req, res, next) => {
  try {
    const deleteLoanType = await loanTypesService.deleteLoanType(
      req.params.loan_type_id
    );
    res.status(200).json(deleteLoanType);
  } catch (error) {
    next(error);
  }
};
