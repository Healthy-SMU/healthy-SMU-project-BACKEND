const { Timeslot } = require("../models/Timeslot");
const { Sequelize , DataTypes} = require("sequelize"); 
const { Healthcare_professional } = require("../models/Healthcare_professional");

//const jwt = require("jsonwebtoken");

const Add = async (req, res) => {
    console.log("Timeslot adding request received ");

    try {
        
        const healthcare_professional = await Healthcare_professional.findOne({
          where: { email_address: req.body.email_address },
        });
    
        if (!healthcare_professional) {
          return res.status(404).json({ error: "Healthcare professional not found." });
        }


    const TSAdd_object = {
        healthcare_professionalID: healthcare_professional.healthcare_professionalID,
        date_and_time: req.body.date_and_time,
        day: req.body.day,
        status: req.body.status,    
    };
     
        
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
         /* const history = async (req, res) => {
            console.log("history request received ");

            const { date } = req.body;
  try {
    //checkage
    const timeslot = await Timeslot.findAll({
      where: Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('time_and_date')),
        '=',
        Sequelize.literal(`DATE('${date}')`)
      ),
    });
    //no matching
    if (!timeslot || timeslot.length === 0) {
      return res.status(404).json({message: "No timeslots at this date" });
    }
   
    // console.log("****************************************************************************************************")

    return res.status(200).json({ message: "Today's timeslots : ", timeslot } );
  } catch (error) {
    //db error
    console.error("Error in history function:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
  }
;
*/

module.exports = { Add };

