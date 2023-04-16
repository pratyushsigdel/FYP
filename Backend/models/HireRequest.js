// product id
// start Date
// End Date
// email
//file
// status [Pending, Processing, Approved, Rejected]

const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true],
  },
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
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Processing", "Approved", "Rejected"],
  },
});

module.exports = mongoose.model("HireRequest", hireSchema);
