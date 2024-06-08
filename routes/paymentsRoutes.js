const express = require("express");
const paymentsController = require("../controllers/paymentsController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

const getPaymentByIdValidator = [
  param("payment_id").notEmpty().withMessage("payment_id is required"),
  validate,
];
const createPaymentValidator = [
  body("transaction").notEmpty().withMessage("transaction is required"),
  body("loan_id").notEmpty().withMessage("loan_id is required"),
  body("amount").notEmpty().withMessage("amount is required"),
  body("payment_date").notEmpty().withMessage("payment_date is required"),
  validate,
];

router.get("/", paymentsController.getAllPayments);
router.get(
  "/:payment_id",
  getPaymentByIdValidator,
  paymentsController.getPaymentById
);

router.post("/", createPaymentValidator, paymentsController.createPayment);

module.exports = router;
