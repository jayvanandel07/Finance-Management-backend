const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan"); //HTTP request logger middleware
const bodyParser = require("body-parser");
const {
  healthCheckRoute,
  userTypesRoutes,
  userRoutes,
  loanTypesRoutes,
  loansRoutes,
  transactionsRoutes,
  accountsRoutes,
} = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/userTypes", userTypesRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/loanTypes", loanTypesRoutes);
app.use("/api/v1/loans", loansRoutes);
app.use("/api/v1/transactions", transactionsRoutes);
app.use("/api/v1/accounts", accountsRoutes);
app.use("/api/v1", healthCheckRoute);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
