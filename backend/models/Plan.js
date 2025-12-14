const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    duration: String,
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
