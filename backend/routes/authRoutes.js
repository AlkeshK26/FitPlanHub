const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Controller Import
const authController = require("../controllers/authController");

// 1. Signup Route
router.post("/signup", authController.signup);

// 2. Login Route
router.post("/login", authController.login);

// 3. Get Profile Route (Protected)
router.get("/me", authMiddleware, authController.getProfile);

// 4. Update Profile Route (Protected)
router.put("/update-profile", authMiddleware, authController.updateProfile);

module.exports = router;