const express = require("express");
const loanTypesController = require("../controllers/loanTypesController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

const loan_type_id_validator = [
  param("loan_type_id")
    .isNumeric()
    .withMessage("loan_type_id should of type integer.")
    .notEmpty()
    .withMessage("loan_type_id is required."),
  validate, // Run validation middleware
];
const createLoanTypeValidator = [
  body("type_name").notEmpty().withMessage("type_name is required."),
  body("interest_rate").notEmpty().withMessage("interest_rate is required."),
  body("tenure").notEmpty().withMessage("tenure is required."),
  body("frequency").notEmpty().withMessage("frequency is required."),
  validate, // Run validation middleware
];

router.get("/", loanTypesController.getAllLoanTypes);
router.get(
  "/:loan_type_id",
  loan_type_id_validator,
  loanTypesController.getLoanTypeById
);

router.post("/", createLoanTypeValidator, loanTypesController.createLoanType);
router.put(
  "/:loan_type_id",
  loan_type_id_validator,
  loanTypesController.updateLoanType
);
router.delete(
  "/:loan_type_id",
  loan_type_id_validator,
  loanTypesController.deleteLoanType
);

module.exports = router;
