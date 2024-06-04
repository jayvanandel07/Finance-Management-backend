const express = require("express");
const loansController = require("../controllers/loansController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

const getLoanByIdValidator = [
  param("loan_id").notEmpty().withMessage("Loan_id is required."),
  validate,
];

router.get("/", loansController.getAllLoans);
router.get("/:loan_id", getLoanByIdValidator, loansController.getLoanById);

module.exports = router;
