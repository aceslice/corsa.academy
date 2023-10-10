const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign(
    { id },
    "$2b$10$lS7v2oG2CW4txqEWxqZcs./n1FEbyxqTLTm777kOjJIEMZfGWWKKy",
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
        res.status(200).json({
          user: user._id,
        });
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
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
module.exports = {
  getLoginPage,
  getSignupPage,
  postLogin,
  postSignup,
  getAuthentication,
};
