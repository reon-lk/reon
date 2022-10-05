const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    uId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    profile: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    isPage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
