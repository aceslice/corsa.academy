const express = require("express");
const router = express.Router();
const courseModel = require("../models/courseModel")
const categories = require("../controllers/courseController");
const userModel = require("../models/userModel")

router.get("/", (req, res)=>{
    res.render("course/coursepage", {title: "All Meetups", categories});
  })
  router.get("/api", (req, res)=>{
    courseModel.find()
    .then(data =>{
      res.json(data)
    })
    .catch(err=> console.log(err))
  })
  router.get("/:id", (req, res)=>{
    courseModel.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => console.log(err))
  })
module.exports = router;