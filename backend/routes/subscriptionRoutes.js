const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Controller Import
const subscriptionController = require("../controllers/subscriptionController");

// 🔥 Subscribe Route
router.post("/", authMiddleware, subscriptionController.subscribeToPlan);

module.exports = router;