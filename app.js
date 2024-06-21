const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan"); //HTTP request logger middleware
const bodyParser = require("body-parser");
const {
  healthCheckRoute,
  userTypesRoutes,
  usersRoutes,
  loanTypesRoutes,
  loansRoutes,
  transactionsRoutes,
  accountsRoutes,
  paymentsRoutes,
  authRoutes,
} = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Auth Routes
app.use("/api/v1/auth", authRoutes);

// Protected Routes
app.use("/api/v1/userTypes", authMiddleware, userTypesRoutes);
app.use("/api/v1/users", authMiddleware, usersRoutes);
app.use("/api/v1/loanTypes", authMiddleware, loanTypesRoutes);
app.use("/api/v1/loans", authMiddleware, loansRoutes);
app.use("/api/v1/transactions", authMiddleware, transactionsRoutes);
app.use("/api/v1/accounts", authMiddleware, accountsRoutes);
app.use("/api/v1/payments", authMiddleware, paymentsRoutes);
app.use("/api/v1", healthCheckRoute);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
