const express = require("express");
const loansController = require("../controllers/loansController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

const loan_idValidator = [
  param("loan_id").notEmpty().withMessage("Loan_id is required."),
  validate,
];

const createLoanValidator = [
  body("user_id").notEmpty().withMessage("user_id is required."),
  body("amount").notEmpty().withMessage("amount is required."),
  body("interest_rate").notEmpty().withMessage("interest_rate is required."),
  body("loan_type_id").notEmpty().withMessage("loan_type_id is required."),
  body("loan_created").notEmpty().withMessage("loan_created is required."),
  body("loan_date").notEmpty().withMessage("loan_date is required."),
  body("due_frequency").notEmpty().withMessage("due_frequency is required."),
  body("due_tenure").notEmpty().withMessage("due_tenure is required."),
  validate,
];

router.get("/", loansController.getAllLoans);
router.get("/:loan_id", loan_idValidator, loansController.getLoanById);

router.post("/", createLoanValidator, loansController.createLoan);
router.put("/:loan_id", loan_idValidator, loansController.updateLoan);

router.delete("/:loan_id", loan_idValidator, loansController.deleteLoan);

module.exports = router;
