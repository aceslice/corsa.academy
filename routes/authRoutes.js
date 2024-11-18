const {getLoginPage, getSignupPage, postLogin, postSignup, getAuthentication, logOut, onboarding, putOnboarding, getOTP} = require("../controllers/authController")
const express = require("express");
const router = express.Router();
const {requireAuth} = require("../middleware/authMiddleware");

router.get("/auth", getAuthentication);
router.get("/login", getLoginPage);
router.post("/login", postLogin);
router.get("/signup",getSignupPage);
router.post("/signup", postSignup);
router.get("/logout",requireAuth, logOut);
router.get("/onboarding", requireAuth, onboarding);
router.put("/onboarding", putOnboarding);
router.get("/otp", getOTP);

module.exports = router;