const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("car", carSchema);
