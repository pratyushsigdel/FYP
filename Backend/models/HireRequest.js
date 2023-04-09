// product id
// start Date
// End Date
// email
// status [Pending, Processing, Approved, Rejected]

const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Approved", "Rejected"],
  },
});

module.exports = mongoose.model("HireRequest", hireSchema);
