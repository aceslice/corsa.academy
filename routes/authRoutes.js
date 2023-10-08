const {getLoginPage, getSignupPage, postLogin, postSignup, getAuthentication} = require("../controllers/authController")
const express = require("express");
const router = express.Router();

router.get("/auth", getAuthentication)
router.get("/login", getLoginPage);
router.post("/login", postLogin);
router.get("/signup",getSignupPage);
router.post("/signup", postSignup);

module.exports = router;