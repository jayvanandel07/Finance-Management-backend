const express = require("express");
const userTypesController = require("../controllers/userTypesController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

const getUserTypeByIdValidator = [
  param("user_type_id").notEmpty().withMessage("user_type_id is required."),
  validate,
];
const createUserTypeValidator = [
  body("type_name").notEmpty().withMessage("type_name is required."),
  validate,
];
const updateUserTypeValidator = [
  param("user_type_id").notEmpty().withMessage("user_type_id is required."),
  body("type_name").notEmpty().withMessage("type_name is required."),
  validate,
];

const deleteUserTypeValidator = [
  param("user_type_id").notEmpty().withMessage("user_type_id is required."),
  validate,
];

router.get("/", userTypesController.getAllUserTypes);
router.get(
  "/:user_type_id",
  getUserTypeByIdValidator,
  userTypesController.getUserTypeById
);

router.post("/", createUserTypeValidator, userTypesController.createUserType);
router.put(
  "/:user_type_id",
  updateUserTypeValidator,
  userTypesController.updateUserType
);
router.delete(
  "/:user_type_id",
  deleteUserTypeValidator,
  userTypesController.deleteUserType
);

module.exports = router;
