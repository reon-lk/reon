const mongoose = require("mongoose");

const pageSchema = mongoose.Schema(
  {
    pId: {
      type: String,
      required: true,
    },
    uId: {
      type: String,
      required: true,
      ref: "User",
    },
    pageName: {
      type: String,
      required: [true, "Please add page name"],
    },
    pageDescription: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Please add phone no"],
      unique: true,
    },
    link: {
      type: String,
      unique: true,
    },
    pageDistrict: {
      type: String,
      required: [true, "Please add district"],
    },
    pageAddress: {
      type: String,
      required: [true, "Please add address"],
    },
    profile: {
      public_id: {
        type: "string",
      },
      secure_url: {
        type: "string",
      },
    },
    banner: {
      public_id: {
        type: "string",
      },
      secure_url: {
        type: "string",
      },
    },
    status: {
      type: String,
    },
    statusComment: {
      type: String,
    },
    tempPageName: {
      type: String,
      required: [true, "Please add page name"],
    },
    tempPageDescription: {
      type: String,
    },
    tempPhone: {
      type: String,
      required: [true, "Please add phone no"],
      unique: true,
    },
    tempLink: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("page", pageSchema);
