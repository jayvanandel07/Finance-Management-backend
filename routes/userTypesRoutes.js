const express = require("express");
const userTypesController = require("../controllers/userTypesController");
const { validate } = require("../middlewares/validator");
const { body } = require("express-validator");

const router = express.Router();

const createDeleteUserTypeValidator = [
  body("type_name").notEmpty().withMessage("type_name is required"),
  validate, // Run validation middleware
];
const updateUserTypeValidator = [
  body("type_name").notEmpty().withMessage("type_name is required"),
  body("updated_type_name")
    .notEmpty()
    .withMessage("updated_type_name is required"),
  validate, // Run validation middleware
];

router.get("/", userTypesController.getAllUserTypes);
router.get("/:type_name", userTypesController.getUserTypeByName);

router.post(
  "/",
  createDeleteUserTypeValidator,
  userTypesController.createUserType
);
router.put("/", updateUserTypeValidator, userTypesController.updateUserType);
router.delete(
  "/",
  createDeleteUserTypeValidator,
  userTypesController.deleteUserType
);

module.exports = router;
