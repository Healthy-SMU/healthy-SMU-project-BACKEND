const Login_router = require("express").Router();
const { login } = require("../Controllers/Login_controller");

    Login_router.post("/login", login);


module.exports = {  Login_router };
