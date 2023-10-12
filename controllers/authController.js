const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.SECRET_KEY,
    { expiresIn: maxAge }
  );
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
  res.render("auth/auth", { title: "Welcome to Corsa Academy" });
};
const logOut = (req, res) =>{
  res.cookie("jwt", '', {maxAge: 1});
  res.redirect("/auth");
}

module.exports = {
  getLoginPage,
  getSignupPage,
  postLogin,
  postSignup,
  getAuthentication,
  logOut
};
