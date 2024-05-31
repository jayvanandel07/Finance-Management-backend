const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res
      .status(200)
      .json({ status: "OK", message: "Database connection is healthy" });
  } catch (error) {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ status: "ERROR", message: "Database connection failed" });
  }
});

module.exports = router;
