const { boolean, ref } = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Userschema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  { Timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

Userschema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

const UserModel = mongoose.model("User", Userschema);

module.exports = {
  UserModel,
};
