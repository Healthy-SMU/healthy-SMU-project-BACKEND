const express = require("express"); 
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const { connectDb } = require('./src/config/connection.js')
const { Student_router } = require("./src/Routes/Student_router");
const { Healthcare_professional_router } = require("./src/Routes/Healthcare_professional_router");
const { Appointment_router } = require("./src/Routes/Appointment_router");
const { Timeslot_router } = require("./src/Routes/Timeslot_router");
const { Login_router } = require("./src/Routes/Login_router");
const { Logout_router } = require("./src/Routes/Logout_router");
const { checkJwtToken } = require("./src/JWToken");
var cors = require('cors') 
const app = express(); 
const dotenv = require("dotenv"); 
dotenv.config(); 
const port = process.env.PORT; 

connectDb(); 

app.use(cors({
    origin: "http://localhost:3000", // Replace with your client's address
    credentials: true,
}

)) ;

app.listen(port, (er) => {
     if (er) { console.log(er); 
    } else { 
        console.log(`server is running on port ${port}`); } 
    }); 
    app.use(express.json()) 
    app.use(cookieParser());



//every request passes by the check Token to validate authentiation
app.use(checkJwtToken);
app.use(fileUpload());
app.use("/api/Student/", Student_router);
app.use("/api/Healthcare_professional", Healthcare_professional_router);
app.use("/api/Appointment/", Appointment_router);
app.use("/api/Timeslot/", Timeslot_router);
app.use("/api/", Login_router);
app.use("/api/", Logout_router);

app.all("/", (req, res) => {
  res.send("hello , homepage");
});







