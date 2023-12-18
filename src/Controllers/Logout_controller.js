const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
    // Clear the HCPtoken and Stoken cookies
    
    res.clearCookie("HCPtoken");
    res.clearCookie("Stoken");

    // Redirect to the login page or any other desired page after logout
    return res.status(200).json({ msg: "Successfully logged out" });
    // res.redirect("/login");
};

module.exports = { logout };