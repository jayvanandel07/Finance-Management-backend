const express = require("express");
const transactionsController = require("../controllers/transactionsController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const router = express.Router();

router.get("/", transactionsController.getAllTransactions);

module.exports = router;
