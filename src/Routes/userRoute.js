const express = require("express"); 
const userRoute = express.Router(); 
// Import the controller functions from the user controller file.
// These functions define the logic that will be executed when a route is matched. 
 const {
    getUsers, 
    postUser, 
    putUser, 
    deleteUser, 
    getOneUser,
 } = require("../Controllers/userController");
  // Route definitions 
  userRoute.get("/users", getUsers); 
  userRoute.get("/users/:id", getOneUser); 
  userRoute.post("/users", postUser); 
  userRoute.put("/users/:id", putUser); 
  userRoute.delete("/users/:id", deleteUser); 

  module.exports = userRoute;