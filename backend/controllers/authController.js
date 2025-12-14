const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const User = require("../models/User");
const Subscription = require("../models/Subscription");

// 1. SIGNUP LOGIC
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create User
    await User.create({ name, email, password: hashedPassword, role });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. LOGIN LOGIC
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check User
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Match Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    // Generate Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. GET USER PROFILE (ME) LOGIC
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // 👇 MAGIC FIX: Nested Populate (Subscription -> Plan -> Trainer)
    const subscriptions = await Subscription.find({ user: req.user.id })
      .populate({
        path: "plan",
        populate: {
          path: "trainer", // Plan ke andar Trainer field ko populate karo
          select: "name email" // Sirf Naam aur Email uthao
        }
      });
    
    // Filter out null plans
    const myPlans = subscriptions
      .filter(sub => sub.plan != null)
      .map(sub => sub.plan);

    res.json({
      user,
      activePlans: myPlans,
    });

  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 4. UPDATE PROFILE LOGIC
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name: name },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};