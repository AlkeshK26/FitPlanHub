const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Controller Import
const followController = require("../controllers/followController");

// 🔥 Follow/Unfollow Route
router.post("/:trainerId", auth, followController.toggleFollow);

module.exports = router;