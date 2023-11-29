const Timeslot_router = require("express").Router();
const { Add } = require("../Controllers/Timeslot_controller");

Timeslot_router.post("/Add", Add);


module.exports = {  Timeslot_router };
