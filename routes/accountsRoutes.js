const express = require("express");
const loanTypesController = require("../controllers/loanTypesController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

module.exports = router;
