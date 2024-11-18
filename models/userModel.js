const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  bio: String,
  followers: Number,
  following: Number,
  username: {
    type: String,
    unique: true,
    default: this.email,
  
  },
  profilePicture: {
    type: String,
    default: null
  },
  enrolledEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meetup",
    },
  ],
  organisedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meetup",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
