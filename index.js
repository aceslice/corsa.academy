const { categories } = require("./controllers/courseController");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const course = require("./routes/courseRoutes");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const User = require("./models/userModel");
dotenv.config();

const app = express();
app.set("view engine", "ejs");
const mongoose = require("mongoose");

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server started successfully on port 3000");
});
app.get("*", checkUser);
app.get("/", (req, res) => {
  res.render("index", {
    title: "Learn from your peers, anytime, anywhere",
    categories,
  });
});
app.use("/courses", course);
app.get("/about", (req, res) => {
  res.render("about", { title: "More about us" });
});
app.get("/comingsoon", (req, res) => {
  res.render("comingsoon", { title: "Join the waitlist" });
});
app.use(authRoutes);
app.get("/app", requireAuth, async (req, res) => {
  try {
    const peers = await User.find({}, { password: 0 , email: 0 });

    res.render("dashboard/dashboard", { title: "Dashboard", peers });
  } catch (error) {
    console.log(error);
  }
});
app.get("/peers", requireAuth, async (req, res) => {
  try {
    const peers = await User.find({}, { password: 0 , email: 0 });
    res.json(peers);
  } catch (error) {
    console.log(error);
  }
});
app.get("/peers/:username", requireAuth, async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne({username: username}, {password: 0}).populate("followers").populate("following");
  res.send(user)
});

// Update a user's followers
app.put("/peers/:id/follow", async (req, res) => {
  try {
    // Get the ID of the user to update
    const userId = req.params.id;

    // Get the follower's ID from the request body
    const followerId = req.body.followerId;

    // Find the user by ID and update the followers array
    const result = await User.updateOne(
      { _id: userId },
      { $addToSet: { following: followerId } }
    );

    const alt = await User.updateOne(
      { _id: followerId },
      { $addToSet: { followers: userId } }
    );
    // If the user is not found, send a 404 error
    if (result.nModified === 0) {
      return res.status(404).send("User not found");
    }

    // Send a response with the updated user data
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Page not found" });
});
