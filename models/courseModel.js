const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    location: String,
    name: String,
    tutor: {
        tutorName: String,
        tutorImage: String,
    },
    tags: Array,
    price: String || Number,
    thumbnail: String,
})
const courseModel = mongoose.model("courses", courseSchema);
module.exports = courseModel;