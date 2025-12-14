const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Controller Import
const planController = require("../controllers/planController");

// 1. Create Plan (Trainer Only - Protected)
router.post("/", auth, planController.createPlan);

// 2. Get All Plans (Open for feed)
router.get("/", planController.getAllPlans);

// 3. Get Single Plan Details (Protected because we check ID)
router.get("/:id", auth, planController.getSinglePlan);

module.exports = router;