const express = require("express");
const userController = require("../controllers/userController");
const { validate } = require("../middlewares/validator");
const { body } = require("express-validator");

const router = express.Router();
// Validator for create user endpoint
const createUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  validate, // Run validation middleware
];
router.post("/", createUserValidator, userController.createUser);
router.get("/", userController.getUsers);

module.exports = router;
