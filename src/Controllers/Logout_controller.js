const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
    // Clear the token cookie
    res.clearCookie("token");

    // Redirect to the login page or any other desired page after logout
    return res.status(200).json({ msg: "Successfully logged out" });
    // res.redirect("/login");
};

module.exports = { logout };
