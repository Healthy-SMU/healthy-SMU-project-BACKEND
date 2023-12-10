const { Timeslot } = require("../models/Timeslot");
const { Sequelize , DataTypes} = require("sequelize"); 
const { Healthcare_professional } = require("../models/Healthcare_professional");


//const jwt = require("jsonwebtoken");

const Add = async (req, res) => {
    console.log("Timeslot adding request received ");

    try {
        // Find healthcare professional
        const healthcare_professional = await Healthcare_professional.findOne({
          where: { email_address: req.body.email_address },
        });
    
        if (!healthcare_professional) {
          return res.status(404).json({ error: "Healthcare professional not found." });
        }


    const TSAdd_object = {
        healthcare_professionalID: healthcare_professional.healthcare_professionalID,
        start_date_and_time: req.body.start_date_and_time,
        end_date_and_time: req.body.end_date_and_time,
        day: req.body.day,
        status: req.body.status,    
    };
     /*
    Sequelize Raw Query for creating a timeslot
    INSERT INTO Timeslots (healthcare_professionalID, start_date_and_time, end_date_and_time, day, status)
    VALUES (:healthcare_professionalID, :start_date_and_time, :end_date_and_time, :day, :status);
    */
        
            const Timeslot_added = await Timeslot.create(TSAdd_object);
            console.log("Timeslot Booked:", Timeslot_added.dataValues);    
            console.log("****************************************************************************************************")
        
            return res.status(200).json({
              msg: "Timeslot successfully booked:",
              Added: Timeslot_added.toJSON(),
            });
          } catch (error) {
            console.error("Error creating Account:", error);
            //db error
            return res.status(500).json({ error: error });
            
          
        }
} ;
         


const Delete = async (req, res) => {
    console.log("Timeslot deletion request received");
  
    try {


        const healthcare_professional = await Healthcare_professional.findOne({
            where: { email_address: req.body.email_address },
          });
      
          if (!healthcare_professional) {
            return res.status(404).json({ error: "Healthcare professional not found." });
          }


        const start_date_and_time = req.body.start_date_and_time;
        /*
    Sequelize Raw Query for deleting a timeslot
    DELETE FROM Timeslots
    WHERE healthcare_professionalID = :healthcare_professionalID
    AND start_date_and_time = :start_date_and_time;
    */
  
      const deletedRows = await Timeslot.destroy({
        where: {
            healthcare_professionalID: healthcare_professional.healthcare_professionalID,
            start_date_and_time: start_date_and_time,
        },
      });
  
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Timeslot not found for deletion." });
      }
  
      return res.status(200).json({ msg: "Timeslot successfully deleted." });
    } catch (error) {
      console.error("Error deleting Timeslot:", error);
      //error in db
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  };



  const Update = async (req, res) => {
    console.log("Timeslot update request received");
  
    try {
      // Find healthcare professional
      const healthcare_professional = await Healthcare_professional.findOne({
        where: { email_address: req.body.email_address },
      });
  
      if (!healthcare_professional) {
        return res.status(404).json({ error: "Healthcare professional not found." });
      }
  
      // Find and update the Timeslot
      const start_date_and_time = req.body.start_date_and_time;
      const end_date_and_time = req.body.end_date_and_time;
      const healthcare_professionalID = req.body.healthcare_professionalID;

  /*
    Sequelize Raw Query for updating a timeslot
    UPDATE Timeslots
    SET start_date_and_time = :new_start_date_and_time, end_date_and_time = :new_end_date_and_time, day = :new_day, status = :new_status
    WHERE healthcare_professionalID = :healthcare_professionalID
    AND start_date_and_time = :start_date_and_time
    AND end_date_and_time = :end_date_and_time;
    */
      const existingTimeslot = await Timeslot.findOne({
        where: {
          healthcare_professionalID: healthcare_professional.healthcare_professionalID,
          start_date_and_time: start_date_and_time,
          end_date_and_time: end_date_and_time,
        },
      });
  
      if (!existingTimeslot) {
        return res.status(404).json({ error: "Timeslot not found for update." });
      }
  
      // Update only the provided attributes
      if (req.body.new_start_date_and_time) {
        existingTimeslot.start_date_and_time = req.body.new_start_date_and_time;
      }
      if (req.body.new_end_date_and_time) {
        existingTimeslot.end_date_and_time = req.body.new_end_date_and_time;
      }
    

      if (req.body.new_day) {
        existingTimeslot.day = req.body.new_day;
      }
  
      if (req.body.new_status) {
        existingTimeslot.status = req.body.new_status;
      }
  
      // Save the updated Timeslot
      await existingTimeslot.save();
  
      console.log("Timeslot Updated:", existingTimeslot.dataValues);
      console.log("****************************************************************************************************");
  
      return res.status(200).json({
        msg: "Timeslot successfully updated:",
        Updated: existingTimeslot.toJSON(),
      });
    } catch (error) {
      console.error("Error updating Timeslot:", error);
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  };






module.exports = { Add , Delete, Update };

