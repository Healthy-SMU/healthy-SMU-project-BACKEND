const express = require("express");
const app = express();

const port=5000;
 app.listen(port, (error)=>{ if(error){console.log("Server Failed")} 
 else{ console.log(`Server Started on port ${port}`)}
 })
 app.use(express.json());

    const users = [ 
        { id: 1, name: "John" },
        { id: 2, name: "Mary" },
        { id: 3, name: "chris" },  
    ];
    app.get("/api", (req, res) => { res.status(200).json({ users: users });});


























