const express = require("express");
const loanTypesController = require("../controllers/loanTypesController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

const createDeleteLoanTypeValidator = [
  body("type_name").notEmpty().withMessage("type_name is required"),
  validate, // Run validation middleware
];
const updateLoanTypeValidator = [
  param("type_name")
    .isString()
    .withMessage("type_name should of type string.")
    .notEmpty()
    .withMessage("type_name is required"),
  body("updated_type_name")
    .notEmpty()
    .withMessage("updated_type_name is required"),
  validate, // Run validation middleware
];

router.get("/", loanTypesController.getAllLoanTypes);
router.get("/:type_name", loanTypesController.getLoanTypeByName);

router.post(
  "/",
  createDeleteLoanTypeValidator,
  loanTypesController.createLoanType
);
router.put(
  "/:type_name",
  updateLoanTypeValidator,
  loanTypesController.updateLoanType
);
router.delete(
  "/",
  createDeleteLoanTypeValidator,
  loanTypesController.deleteLoanType
);

module.exports = router;
