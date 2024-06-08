const express = require("express");
const accountsController = require("../controllers/accountsController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

const account_noValidator = [
  param("account_no").notEmpty().withMessage("account_no is required."),
  validate,
];
const getAccountsByUserIdValidator = [
  param("user_id").notEmpty().withMessage("user_id is required."),
  validate,
];
const createAccountValidator = [
  body("account_no").notEmpty().withMessage("account_no is required."),
  body("name").notEmpty().withMessage("account_name is required."),
  body("user_id").notEmpty().withMessage("user_id is required."),
  body("balance").notEmpty().withMessage("balance is required."),
  validate,
];

router.get("/", accountsController.getAllAccounts);
router.get(
  "/:account_no",
  account_noValidator,
  accountsController.getAccountsByAccountNo
);
router.get(
  "/userId/:user_id",
  getAccountsByUserIdValidator,
  accountsController.getAccountsByUserId
);

router.post("/", createAccountValidator, accountsController.createAccount);
router.put(
  "/:account_no",
  account_noValidator,
  accountsController.updateAccount
);

router.delete(
  "/:account_no",
  account_noValidator,
  accountsController.deleteAccount
);
module.exports = router;
