const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: String,
    jobTitle: String,
    status: {
      type: String,
      default: "Applied",
    },
    applicationDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);