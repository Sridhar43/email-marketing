const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    audience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audience",
      required: true,
    },

    status: {
      type: String,
      enum: ["Draft", "Sent"],
      default: "Draft",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Campaign", campaignSchema);