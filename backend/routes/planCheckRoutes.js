const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Controller Import
const analyticsController = require("../controllers/analyticsController");

// 🔥 Stats Route
router.get("/trainer/stats", authMiddleware, analyticsController.getTrainerStats);

module.exports = router;