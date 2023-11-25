const users = [ 
    { name: "mary", id: 1, age: 50 }, 
    { name: "lisa", id: 2, age: 20 }, 
    { name: "josh", id: 3, age: 30 },
 ];

 const getUsers = (req, res) => { 
    res.status(200).json({ users: users }); 
}; 

const getOneUser = (req, res) => { 
    const id = req.params.id; 
    const founUser = users.find((user) => user.id == id); 
    if (founUser) { 
        res.status(200).json({ user: founUser }); 
    } else { 
        res.status(400).json({ msg: "no user found" }); 
    } 
}; 

const postUser = (req, res) => { 
    console.log("add user"); 
}; 

const putUser = (req, res) => { 
    console.log("put user"); 
}; 

const deleteUser = (req, res) => { 
    console.log("delete user"); 
}; 

module.exports = { getUsers, postUser, putUser, deleteUser, getOneUser };