const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    postCode: {
      type: Number,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    residance: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
