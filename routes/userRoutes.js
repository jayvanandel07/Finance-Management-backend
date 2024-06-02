const express = require("express");
const userController = require("../controllers/userController");
const { validate } = require("../middlewares/validator");
const { body } = require("express-validator");

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

router.get("/", userController.getUsers);
router.get("/:user", userController.getUserByIdOrName);

router.post("/", createUserValidator, userController.createUser);

module.exports = router;
