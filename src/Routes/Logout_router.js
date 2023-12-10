const Logout_router = require("express").Router();
const { logout } = require("../Controllers/Logout_controller");

    Logout_router.post("/logout", logout);


module.exports = {  Logout_router };
