const Appointment_router = require("express").Router();
const { booking, history } = require("../Controllers/Appointment_controller");

Appointment_router.post("/booking", booking);
Appointment_router.post("/history", history);


module.exports = {  Appointment_router };
