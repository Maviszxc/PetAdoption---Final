const Login = require("../models/loginSchema");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  console.log("Received login request:", { username, password });

  try {
    // Find user by username
    const user = await Login.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Check password
    if (password !== user.password) {
      console.log("Password does not match");
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    console.log("Login successful");
    // If login is successful, send a success response
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { hint, newPassword } = req.body;

  console.log("Received hint:", hint);
  console.log("Received newPassword:", newPassword);

  try {
    const user = await Login.findOne({ hint });
    if (!user) {
      console.log("Hint does not match any user");
      return res
        .status(400)
        .json({ success: false, message: "Incorrect hint" });
    }

    if (!newPassword) {
      console.log("New password is undefined");
      return res
        .status(400)
        .json({ success: false, message: "New password must be provided" });
    }

    // Update password without hashing
    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.Admin = (req, res) => {
  Login.find({ isAdmin: true })
    .then((admins) => {
      res.json({ success: true, admins });
    })
    .catch((error) => {
      console.error("Error querying database: ", error);
      res
        .status(500)
        .json({ success: false, message: "An unexpected error occurred" });
    });
};
