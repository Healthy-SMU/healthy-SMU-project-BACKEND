const { Healthcare_professional } = require("../models/Healthcare_professional");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    console.log("signup request received ");
    const signup_object = {
        email_address: req.body.email_address,
        fullname: req.body.fullname,
        password: req.body.password,
        phone_number: req.body.phone_number,
        category: req.body.category,};

        const emailExists = await Healthcare_professional.findOne({
          where: { email_address: req.body.email_address }
      });
  
      if (emailExists) {
          // Email address already exists
          return res.status(400).json({ msg: "Email address already exists." });
      }

     
        try {
            const Healthcare_professional_added = await Healthcare_professional.create(signup_object);
            console.log("Healthcare_professional Added:", Healthcare_professional_added.dataValues);
            console.log("****************************************************************************************************")
        
            return res.status(200).json({
              msg: "Successfully added:",
              Added: Healthcare_professional_added.toJSON(),
            });
          } catch (error) {
            console.error("Error creating Account:", error);
            //db error
            return res.status(500).json({ error: error });
            
          } 
        };
          



        const uploadFile = async (req, res) => {
          try {

            // Find the healthcare professional by EMAIL_ADDRESS
            const healthcare_professional = await Healthcare_professional.findOne({
              where: { email_address: req.body.email_address },
            });
        
            if (!healthcare_professional) {
              return res.status(404).json({ error: "Healthcare professional not found." });
            }
            
            if (!req.files || Object.keys(req.files).length === 0) {
              return res.status(400).json({ error: "No files were uploaded." });
            }

            const uploadedFile = req.files.uploadedFile;

            healthcare_professional.career = {
              data: uploadedFile.data.toString('base64'), 
              mimetype: uploadedFile.mimetype,
              filename: uploadedFile.name,
            };

            await healthcare_professional.save();
                  
            // Respond with success message
            return res.status(200).json({ success: true, message: "file uploaded successfully." });
          } catch (error) {
            console.error("Error uploading file:", error);
            return res.status(500).json({ error: "Internal server error.", details: error.message });
          }
        };
        
        
module.exports = { signup, uploadFile };

