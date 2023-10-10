const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true, 
        minLength: 6
    },
    bio: String,
    followers: Number,
    following: Number,
    username: {
        type: String,
        unique: true
    },
    profilePicture: String,
    enrolledEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }]
    ,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follower"
    }]
    ,
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follower"
    }]
})
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
const User = mongoose.model("users", userSchema);


module.exports = User;