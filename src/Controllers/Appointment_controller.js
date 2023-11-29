const { Appointment } = require("../models/Appointment");
const { Sequelize , DataTypes} = require("sequelize"); 
//const jwt = require("jsonwebtoken");

const booking = async (req, res) => {
    console.log("Appointment booking request received ");
    const booking_object = {
        studentID: req.body.studentID,
        healthcare_professionalID: req.body.healthcare_professionalID,
        date_time: req.body.date_time,
        room_number: req.body.room_number,
        reason_of_appointment: req.body.reason_of_appointment,
        comment: req.body.comment,
        status: req.body.status, };
     
        try {
            const Appointment_booked = await Appointment.create(booking_object);
            console.log("Appointment Booked:", Appointment_booked.dataValues);
            console.log("****************************************************************************************************")
        
            return res.status(200).json({
              msg: "Appointment successfully booked:",
              booked: Appointment_booked.toJSON(),
            });
          } catch (error) {
            console.error("Error creating Account:", error);
            //db error
            return res.status(500).json({ error: error });
            
          } 
        };
          const history = async (req, res) => {
            console.log("history request received ");

            const { date } = req.body;
  try {
    //checkage
    const appointment = await Appointment.findAll({
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('time_and_date')),
        '=',
        Sequelize.literal(`DATE('${date}')`)
      ),
    });
    //no matching
    if (!appointment || appointment.length === 0) {
      return res.status(404).json({message: "No appointments at this date" });
    }
   
    // console.log("****************************************************************************************************")

    return res.status(200).json({ message: "Today's appointments : ", appointment } );
  } catch (error) {
    //db error
    console.error("Error in history function:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
  }
;

module.exports = { booking, history };

