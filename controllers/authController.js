const userModel = require("../models/userModel");
const getLoginPage = (req, res)=>{
    res.render("auth/login", {title: "Login"})
}
const postLogin = (req, res)=>{
    const {email, password} = req.body;
    console.log(email, password);
}

const getSignupPage = (req, res)=>{
    res.render("auth/signup",{title: "Create Account"});
}
const postSignup = (req, res) =>{
    res.send("Signup Posted");
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