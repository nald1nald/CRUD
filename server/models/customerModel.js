const mongoose = require("mongoose");

const schemaData = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("customer", schemaData);
