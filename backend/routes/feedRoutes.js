const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Controller Import
const feedController = require("../controllers/feedController");

// 🔥 Feed Route
router.get("/", auth, feedController.getUserFeed);

module.exports = router;