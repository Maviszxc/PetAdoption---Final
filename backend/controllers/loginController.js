const Login = require("../models/loginSchema");

const mongoose = require("mongoose");

module.exports.login = (req, res) => {
  const { username, password } = req.body;

  // Find a user with the provided username
  Login.findOne({ username })
    .then((user) => {
      if (user) {
        // Check if password matches
        if (user.password === password) {
          // If password matches, return success response
          res.json({ success: true, message: "Login successful" });
        } else {
          // If password doesn't match, return error response
          res.status(401).json({ success: false, message: "Invalid password" });
        }
      } else {
        // If user is not found, return error response
        res.status(401).json({ success: false, message: "User not found" });
      }
    })
    .catch((error) => {
      // Handle database errors or other unexpected errors
      console.error("Error querying database: ", error);
      res
        .status(500)
        .json({ success: false, message: "An unexpected error occurred" });
    });
};