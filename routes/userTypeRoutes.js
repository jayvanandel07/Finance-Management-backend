const express = require("express");
const userTypeController = require("../controllers/userTypeController");
const { validate } = require("../middlewares/validator");
const { body } = require("express-validator");

const router = express.Router();

const createUserTypeValidator = [
  body("type_name").notEmpty().withMessage("type_name is required"),
  validate, // Run validation middleware
];
router.post("/", createUserTypeValidator, userTypeController.createUserType);

module.exports = router;
