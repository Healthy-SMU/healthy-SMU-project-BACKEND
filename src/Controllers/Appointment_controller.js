const { Appointment } = require("../models/Appointment");
const { Sequelize , DataTypes} = require("sequelize"); 
const { Student } = require("../models/Student");
const { sequelize } = require("../config/connection");
//const jwt = require("jsonwebtoken");

const booking = async (req, res) => {
    console.log("Appointment booking request received ");


    try {
      // Find Student
      const student = await Student.findOne({
        where: { email_address: req.body.email_address },
      });
  
      if (!student) {
        return res.status(404).json({ error: "Student not found." });
      }

    const booking_object = {
        studentID: student.StudentID,
        healthcare_professionalID: req.body.healthcare_professionalID,
        start_date_time: req.body.start_date_time,
        end_date_time: req.body.end_date_time,
        room_number: req.body.room_number,
        reason_of_appointment: req.body.reason_of_appointment,
        comment: req.body.comment,
        status: req.body.status, };
     /*
    Sequelize Raw Query for creating an appointment
    INSERT INTO Appointments (studentID, healthcare_professionalID, start_date_time, end_date_time, room_number, reason_of_appointment, comment, status)
    VALUES (:studentID, :healthcare_professionalID, :start_date_time, :end_date_time, :room_number, :reason_of_appointment, :comment, :status);
    */
  
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
             /*
    Sequelize Raw Query for retrieving appointments on a specific date
    SELECT * FROM Appointments WHERE DATE(start_time_and_date) = DATE(:date);
    */
  try {
    //checkage
    const appointments = await Appointment.findAll({
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('start_time_and_date')),
        '=',
        Sequelize.literal(`DATE('${date}')`)
      ),
    });
    //no matching
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({message: "No appointments at this date" });
    }
   
    // console.log("****************************************************************************************************")

/*
    Sequelize Raw Query for calling a stored procedure
    CALL UpdateAppointmentStatus(:appointmentID);
    */
    for (const appointment of appointments) {
      await sequelize.query('CALL UpdateAppointmentStatus(:appointmentID)', {
        replacements: { appointmentID: appointment.appointmentID },
      }).then(() => {
        console.log(`Procedure executed successfully for appointmentID ${appointment.appointmentID}`);
        return appointment.reload();
      }).catch(err => {
        console.error(`Error executing procedure for appointmentID ${appointment.appointmentID}:`, err);
      });
    }


    return res.status(200).json({ message: "Today's appointments : ", appointments } );
  } catch (error) {
    //db error
    console.error("Error in history function:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
  }
;

module.exports = { booking, history };

