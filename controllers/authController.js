const User = require("../models/userModel");
const userModel = require("../models/userModel");
const getLoginPage = (req, res)=>{
    res.render("auth/login", {title: "Login"})
}
const postLogin = (req, res) => {
    const { email, password } = req.body;
}
const getSignupPage = (req, res)=>{
    res.render("auth/signup",{title: "Create Account"});
}
const postSignup = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.create({
            email,
            password
        });
        res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
        res.status(400).send("User not created");
    }
}
const getAuthentication = (req, res)=>{
    res.render("auth/auth", {title: "Welcome to Corsa Academy"})
}
module.exports = {
    getLoginPage,
    getSignupPage,
    postLogin,
    postSignup,
    getAuthentication
}