const { categories } = require("./controllers/courseController");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const course = require("./routes/courseRoutes");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
dotenv.config();
const { promisify } = require("util");
const app = express();
app.set("view engine", "ejs");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const port = process.env.port || 5000;
mongoose.connect(`${process.env.DB_CONNECTION_STRING}`).then((res) => {
  console.log("Database Connected Succesfully");
  app.listen(port, () => {
    console.log(`Server started successfully on port ${port}`);
  });
});

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/", async (req, res) => {
  let tutors = await User.find({});
  res.render("index", {
    title: "Learn from your peers, anytime, anywhere",
    categories,
    tutors,
  });
});
app.use("/courses", course);
app.get("/about", (req, res) => {
  res.render("about", { title: "More about us" });
});
app.get("/comingsoon", (req, res) => {
  res.render("comingsoon", { title: "Join the waitlist" });
});
app.get("/select", requireAuth, (req, res) => {
  res.render("other/select", { title: "Choose your super powers" });
});
app.use(authRoutes);
app.get("/app", requireAuth, async (req, res) => {
  try {
    const peers = await User.find({}, { password: 0, email: 0 });

    res.render("dashboard/dashboard", {
      title: "Dashboard",
      peers,
      user: res.locals.user,
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/peers", requireAuth, async (req, res) => {
  try {
    const peers = await User.find({}, { password: 0, email: 0 });
    res.json(peers);
  } catch (error) {
    console.log(error);
  }
});
app.get("/peers/:username", requireAuth, async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username }, { password: 0 })
    .populate("following", "firstName lastName username")
    .exec();
  let currentUser = null;

  const token = req.cookies.jwt;
  if (token) {
    try {
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.SECRET_KEY
      );
      currentUser = await User.findById(decodedToken.id)
        .populate("following", "firstName lastName username")
        .exec();
    } catch (err) {
      console.log(err);
    }
  }
  const profileFollowers = user.following;
  const currentFollowers = currentUser.following;
  console.log("Current", currentFollowers);
  console.log("Profile", profileFollowers);
  const commonFollowers = new Set([...profileFollowers, ...currentFollowers]);
  console.log(commonFollowers);
  res.render("dashboard/profile", {
    peer: user,
    title: user.username,
    commonFollowers,
  });
});

// Update a user's followers
app.put("/peers/:id/follow", requireAuth, async (req, res) => {
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
app.put("/peers/:id/unfollow", requireAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const followerId = req.body.followerId;

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { following: followerId } }
    );
    const alt = await User.updateOne(
      { _id: followerId },
      { $pull: { followers: userId } }
    );

    if (result.nModified === 0 && alt.nModified === 0) {
      return res.status(404).send("Unfollow operation failed");
    }

    res.status(200).send("Unfollowed successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
app.use((req, res) => {
  res
    .status(404)
    .render("404", { title: "Page not found", user: res.locals.user });
});
