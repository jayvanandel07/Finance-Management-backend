const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { validate } = require("../middlewares/validator");
const { param, body } = require("express-validator");

const createUserValidator = [
  body("user_id").notEmpty().withMessage("user_id is required"),
  body("password").notEmpty().withMessage("password is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .if(body("email").exists({ checkFalsy: true }))
    .isEmail()
    .withMessage("Invalid email address"),
  body("user_type_id").notEmpty().withMessage("user_type_id is required"),
  validate, // Run validation middleware
];
// Register new user
router.post("/register", createUserValidator, authController.register);

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
