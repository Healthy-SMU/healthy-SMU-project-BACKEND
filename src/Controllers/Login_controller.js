const { Student } = require("../models/Student");
const { Healthcare_professional } = require("../models/Healthcare_professional");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    console.log("login request received ");

    const { email_address, password } = req.body;
/*
    Sequelize Raw Query for checking login credentials in the Student table
    SELECT * FROM Students WHERE email_address = :email_address AND password = :password;
    */

    try {
        // Check in Student table
        let user = await Student.findOne({
            where: { email_address: email_address, password: password },
        });

        if (user) {
            // Student found, generate JWT and set cookie
            console.log("Student logged in:", user.toJSON());
            const token = jwt.sign({ email_address: user.email_address }, process.env.SECRET);
            res.cookie("token", token, { httpOnly: true });
            return res.status(200).send("Student logged in");
        }
        /*
    Sequelize Raw Query for checking login credentials in the Healthcare_professional table
    SELECT * FROM Healthcare_professionals WHERE email_address = :email_address AND password = :password;
    */

        // If not found in Student table, check in Healthcare_professional table
        user = await Healthcare_professional.findOne({
            where: { email_address: email_address, password: password },
        });

        if (user) {
            // Healthcare professional found, generate JWT and set cookie
            console.log("Healthcare professional logged in:", user.toJSON());
            const token = jwt.sign({ email_address: user.email_address }, process.env.SECRET);
            res.cookie("token", token, { httpOnly: true });
            return res.status(200).send("Healthcare professional logged in");
        }

        // If not found in either table, return error message
        console.log("Wrong email or password");
        return res.status(401).send("Wrong email or password");
    } catch (error) {
        // Database error
        console.error("Error during login:", error);
        return res.status(500).json({ error: error });
    }
};

module.exports = { login };
