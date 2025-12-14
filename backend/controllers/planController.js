const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

// 1. 🔥 Create Plan Logic (Trainer Only)
exports.createPlan = async (req, res) => {
  try {
    if (req.user.role !== "trainer") {
      return res.status(403).json({ message: "Only trainers allowed" });
    }

    const plan = await Plan.create({
      ...req.body,
      trainer: req.user.id
    });

    res.status(201).json(plan);
  } catch (error) {
    console.error("Create Plan Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. 🔥 Get All Plans (Public/Preview)
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().populate("trainer", "name");
    res.json(plans);
  } catch (error) {
    console.error("Get Plans Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 3. 🔥 Get Single Plan (With Access/Lock Check)
exports.getSinglePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id).populate("trainer", "name");
    
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Check if user has subscribed
    const isSubscribed = await Subscription.findOne({
      user: req.user.id,
      plan: plan._id
    });

    // Agar user Trainer hai ya Subscribe kiya hua hai -> FULL ACCESS
    if (isSubscribed || req.user.role === "trainer") {
      return res.json({ 
        ...plan._doc, 
        hasAccess: true 
      });
    }

    // Agar Subscribe nahi kiya -> LIMITED ACCESS (Locked)
    res.json({
      _id: plan._id,
      title: plan.title,
      price: plan.price,
      trainer: plan.trainer,
      hasAccess: false,
      message: "Subscribe to view full details"
    });

  } catch (error) {
    console.error("Single Plan Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};