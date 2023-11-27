const Healthcare_professional_router = require("express").Router();
const { signup, login } = require("../Controllers/Healthcare_controller");

Healthcare_professional_router.post("/signup", signup);
Healthcare_professional_router.post("/login", login);


module.exports = {  Healthcare_professional_router };
