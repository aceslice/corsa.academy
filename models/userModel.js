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
    likes: Array,
    userImage: String
})
const User = mongoose.model("users", userSchema);
module.exports = User;