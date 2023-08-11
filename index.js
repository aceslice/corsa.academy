const {categories, courses} = require("./controllers/courseController")
const express = require("express");
const cors = require("cors")
const app = express();
app.set("view engine", "ejs");
app.use(cors(
  {
    methods: ["POST", "GET"],
    credentials: true
  }
))
app.use(express.static("public"));
app.listen(3000, () => {
  console.log("Server started successfully on port 3000");
});

app.get("/", (req, res) => {
  res.render("index", { title: "Quality tutoring, anytime, anywhere" ,categories, courses});
});
app.get("/courses", (req, res)=>{
  res.render("course/coursepage", {title: "All courses", categories, courses});
})
app.get("/about", (req, res) => {
  res.render("about", { title: "More about us" });
});
app.get("/comingsoon", (req, res) => {
  res.render("comingsoon", { title: "Join the waitlist" });
});
app.use((req, res)=>{
    res.status(404).render("404", {title: "Page not found"});
})