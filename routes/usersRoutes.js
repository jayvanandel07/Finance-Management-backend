const express = require("express");
const usersController = require("../controllers/usersController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();
// Validator for create user endpoint
const createUserValidator = [
  body("user_id").notEmpty().withMessage("user_id is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .if(body("email").exists({ checkFalsy: true }))
    .isEmail()
    .withMessage("Invalid email address"),
  body("user_type").notEmpty().withMessage("user_type is required"),
  validate, // Run validation middleware
];
const updateDeleteUserValidator = [
  param("user_id")
    .isNumeric()
    .withMessage("user_id should be a integer")
    .notEmpty()
    .withMessage("user_id param is required"),
  validate, // Run validation middleware
];

router.get("/", usersController.getUsers);
router.get("/:user", usersController.getUserByIdOrName);

router.post("/", createUserValidator, usersController.createUser);
router.put("/:user_id", updateDeleteUserValidator, usersController.updateUser);
router.delete(
  "/:user_id",
  updateDeleteUserValidator,
  usersController.deleteUserById
);

module.exports = router;
