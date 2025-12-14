const Plan = require("../models/Plan");
const User = require("../models/User");

// 🔥 Get User Feed Logic
exports.getUserFeed = async (req, res) => {
  try {
    // 1. Current User ko dhundo taaki uski 'following' list mil sake
    const user = await User.findById(req.user.id);

    // 2. Wo Plans dhundo jinke trainer ko user follow kar raha hai
    const plans = await Plan.find({
      trainer: { $in: user.following }
    }).populate("trainer", "name"); // Trainer ka naam bhi lao

    res.json(plans);

  } catch (error) {
    console.error("Feed Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};