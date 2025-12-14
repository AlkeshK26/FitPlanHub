const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

// 🔥 Get Trainer Stats Logic
exports.getTrainerStats = async (req, res) => {
  try {
    const trainerId = req.user.id; 

    // 1. Find trainer's plans
    const myPlans = await Plan.find({ trainer: trainerId });
    
    // If no plans found
    if (myPlans.length === 0) {
        return res.json({
            totalPlans: 0,
            followers: 0,
            totalEarnings: 0,
            subscribers: []
        });
    }

    const planIds = myPlans.map(plan => plan._id);

    // 2. Find Subscriptions for these plans
    const subscriptions = await Subscription.find({ plan: { $in: planIds } })
      .populate("user", "name email") 
      .populate("plan", "title price");

    // 3. Calculate Total Earnings
    const totalEarnings = subscriptions.reduce((total, sub) => {
        return total + (sub.plan ? sub.plan.price : 0);
    }, 0);

    // 4. Send Response
    res.json({
      totalPlans: myPlans.length,
      followers: 0, // (Iske liye Follow model connect karna padega future mein)
      totalEarnings,
      subscribers: subscriptions 
    });

  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Server Error fetching stats" });
  }
};