const Student_router = require("express").Router();
const { signup, login } = require("../Controllers/Student_controller");

Student_router.post("/signup", signup);
Student_router.post("/login", login);


module.exports = {  Student_router };
