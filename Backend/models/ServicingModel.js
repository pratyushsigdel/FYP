const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  regNum: {
    type: String,
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
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Service", serviceSchema);
