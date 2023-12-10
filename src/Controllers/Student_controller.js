  const { Student } = require("../models/Student");
  const jwt = require("jsonwebtoken");

  const signup = async (req, res) => {
      console.log("signup request received ");
      const signup_object = {
          email_address: req.body.email_address,
          fullname: req.body.fullname,
          password: req.body.password,
          phone_number: req.body.phone_number, };


          const emailExists = await Student.findOne({
            where: { email_address: req.body.email_address }
        });
    
        if (emailExists) {
            // Email address already exists
            return res.status(400).json({ msg: "Email address already exists." });
        }
/*
    Sequelize Raw Query for creating a student
    INSERT INTO Students (email_address, fullname, password, phone_number)
    VALUES (:email_address, :fullname, :password, :phone_number);
    */
      
          try {
              const Student_added = await Student.create(signup_object);
              console.log("Student Added:", Student_added.dataValues);
              console.log("****************************************************************************************************")
          
              return res.status(200).json({
                msg: "Successfully added:",
                Added: Student_added.toJSON(),
              });
            } catch (error) {
              console.error("Error creating Account:", error);
              //db error
              return res.status(500).json({ error: error });
              
            } 
          };
            
  module.exports = { signup };

