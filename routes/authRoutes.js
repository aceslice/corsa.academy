const {getLoginPage, getSignupPage, postLogin, postSignup, getAuthentication, logOut} = require("../controllers/authController")
const express = require("express");
const router = express.Router();

router.get("/auth", getAuthentication)
router.get("/login", getLoginPage);
router.post("/login", postLogin);
router.get("/signup",getSignupPage);
router.post("/signup", postSignup);
router.get("/logout", logOut);

module.exports = router;