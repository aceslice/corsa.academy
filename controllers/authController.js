const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const requireAuth = require("../middleware/authMiddleware");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};
const getLoginPage = (req, res) => {
  res.render("auth/login", { title: "Login" });
};
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
          user: user._id,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const getSignupPage = (req, res) => {
  res.render("auth/signup", { title: "Create Account" });
};
const postSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({
      email,
      password,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({
      user: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("User not created");
  }
};
const getAuthentication = (req, res) => {
  res.render("auth/auth", { title: "Welcome to Classroom Experts" });
};
const logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/auth");
};
const onboarding = (req, res) => {
  res.render("auth/onboarding", { title: "Welcome to Classroom Experts" });
};
const putOnboarding = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      try {
        // Get the ID of the user to update
        const userId = decodedToken.id;

        // Get the first name, middle name, and last name from the request body
        const { firstName, middleName, lastName, username } = req.body;
        const avatar = `https://ui-avatars.com/api/?name=${firstName}+${middleName}+${lastName}&&format=svg&background=random&font-size=0.33&bold=true&color=random&unique=true`;
        // Find the user by ID and update the first name, middle name, and last name
        const result = await User.updateOne(
          { _id: userId },
          { $set: { firstName, middleName, lastName, username, profilePicture: avatar } }
        );

        // If the user is not found, send a 404 error
        if (result.nModified === 0) {
          return res.status(404).send("User not found");
        }

        // Send a response with the updated user data
        res.status(200).json({user: userId});
      } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
      }
    });
  } else {
    res.redirect("/auth");
  }
};
const getOTP = (req, res) =>{
    res.render("auth/otp", { title: "Verify your email" });

}
module.exports = {
  getLoginPage,
  getSignupPage,
  postLogin,
  postSignup,
  getAuthentication,
  logOut,
  onboarding,
  putOnboarding,
  getOTP
};
