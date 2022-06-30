const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      max: 50,
    },
    country: {
      type: String,
      max: 50,
    },
    bio: {
      type: String,
      max: 500,
      min: 6,
    },
    birthday: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
