const express = require("express");
const transactionsController = require("../controllers/transactionsController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

const getTransactionByIdValidator = [
  param("transaction_id").notEmpty().withMessage("transaction_id is required"),
  validate,
];
const createTransactionValidator = [
  body("user_id").notEmpty().withMessage("user_id is required"),
  body("amount").notEmpty().withMessage("amount is required"),
  body("transaction_type")
    .notEmpty()
    .withMessage("transaction_type is required"),
  body("transaction_date")
    .notEmpty()
    .withMessage("transaction_date is required"),
  validate,
];

router.get("/", transactionsController.getAllTransactions);
router.get(
  "/:transaction_id",
  getTransactionByIdValidator,
  transactionsController.getTransactionById
);

router.post(
  "/",
  createTransactionValidator,
  transactionsController.createTransaction
);

module.exports = router;
