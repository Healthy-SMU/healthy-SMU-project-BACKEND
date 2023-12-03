const Student_router = require("express").Router();
const { signup } = require("../Controllers/Student_controller");

Student_router.post("/signup", signup);


module.exports = {  Student_router };
