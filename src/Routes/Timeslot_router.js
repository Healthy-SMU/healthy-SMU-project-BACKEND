const Timeslot_router = require("express").Router();
const { Add, Update, Delete } = require("../Controllers/Timeslot_controller");


Timeslot_router.post("/Add", Add);
Timeslot_router.post("/Delete", Delete);
Timeslot_router.post("/Update", Update);


module.exports = {  Timeslot_router };
