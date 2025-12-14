const Subscription = require("../models/Subscription");

// 🔥 Subscribe to Plan Logic
exports.subscribeToPlan = async (req, res) => {
  try {
    const { planId } = req.body; 

    // 1. Validation
    if (!planId) {
        return res.status(400).json({ message: "Plan ID required" });
    }

    // 2. Check if already subscribed
    const existing = await Subscription.findOne({ user: req.user.id, plan: planId });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    // 3. Create Subscription
    await Subscription.create({
      user: req.user.id,
      plan: planId,
      startDate: new Date()
    });

    res.json({ success: true, message: "Subscribed successfully!" });
    
  } catch (error) {
    console.error("Subscription Error:", error); 
    res.status(500).json({ message: "Server Error" });
  }
};