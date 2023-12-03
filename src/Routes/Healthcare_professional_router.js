const Healthcare_professional_router = require("express").Router();
const { signup, uploadFile } = require("../Controllers/Healthcare_controller");


Healthcare_professional_router.post("/signup", signup);
Healthcare_professional_router.post("/uploadFile", uploadFile);

module.exports = {  Healthcare_professional_router };
