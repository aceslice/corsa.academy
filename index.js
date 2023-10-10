const {categories} = require("./controllers/courseController")
const authRoutes = require("./routes/authRoutes")
const course = require("./routes/courseRoutes")
const express = require("express");

const app = express();
app.set("view engine", "ejs");
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/corsa_academy");

app.use(express.json());
app.use(express.static("public"));
app.listen(3000, () => {
  console.log("Server started successfully on port 3000");
});
app.get("/", (req, res) => {
  res.render("index", { title: "Learn from your peers, anytime, anywhere" ,categories});
});
app.use("/courses", course);
app.get("/about", (req, res) => {
  res.render("about", { title: "More about us" });
});
app.get("/comingsoon", (req, res) => {
  res.render("comingsoon", { title: "Join the waitlist" });
});
app.use(authRoutes);
app.get("/home", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
})
app.use((req, res)=>{
    res.status(404).render("404", {title: "Page not found"});
})