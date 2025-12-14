const User = require("../models/User");

// 🔥 Toggle Follow Logic
exports.toggleFollow = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Check agar pehle se follow kar raha hai
    if (user.following.includes(req.params.trainerId)) {
      user.following.pull(req.params.trainerId); // Unfollow (Remove)
    } else {
      user.following.push(req.params.trainerId); // Follow (Add)
    }

    await user.save();
    res.json({ message: "Updated following list" });
    
  } catch (error) {
    console.error("Follow Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};