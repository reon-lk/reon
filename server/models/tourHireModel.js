const mongoose = require("mongoose");

const tourHireSchema = mongoose.Schema(
  {
    hId: {
      type: String,
      required: true,
      unique: true,
    },
    vId: {
      type: String,
      required: true,
    },
    pId: {
      type: String,
      required: true,
    },
    uId: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: [true, "Please add pickup location"],
    },
    dropoffLocation: {
      type: String,
      required: [true, "Please add dropoff location"],
    },
    pickupDropoffTime: {
      from: { type: String },
      to: { type: String },
    },
    passengers: {
      type: String,
      required: [true, "Please add passengers count"],
    },
    isAccept: {
      type: String,
      required: true,
    },
    acceptAmount: {
      type: Number,
      required: true,
    },
    acceptTime: {
      type: String,
      required: true,
    },
    isConfirm: {
      type: String,
      required: true,
    },
    confirmTime: {
      type: String,
      required: true,
    },
    transactionId: {
      type: Number,
      required: true,
    },
    isFinished: {
      type: String,
      required: true,
    },
    finishedTime: {
      type: String,
      required: true,
    },
    transactionId :{
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("tourhire", tourHireSchema);
