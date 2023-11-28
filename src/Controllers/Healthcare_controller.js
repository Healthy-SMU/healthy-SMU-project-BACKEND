const { Healthcare_professional } = require("../models/Healthcare_professional");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    console.log("signup request received ");
    const signup_object = {
        email_address: req.body.email_address,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        phone_number: req.body.phone_number,
        category: req.body.category,
        career: req.body.career,
    };
     
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
          const login = async (req, res) => {
            console.log("login request received ");

            const { email_address, password } = req.body;
  try {
    //checkage
    const healthcare_professional = await Healthcare_professional.findOne({
      where: { email_address: email_address },
    });
    //no matching
    if (!healthcare_professional || healthcare_professional.password !== password) {
      return res.status(401).send("wrong username or password");
    }
    // user authenticated , generate jwt
    console.log(healthcare_professional.toJSON());

    const token = jwt.sign({email_address : healthcare_professional.email_address}, process.env.SECRET);

    res.cookie("token", token, { httpOnly: true });
    console.log("****************************************************************************************************")

    return res.status(200).send("successful login ");
  } catch (error) {
    //db error
    return res.status(500).json({ error: error });
  }
};

module.exports = { signup, login };

