const Login = require("../models/loginSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



module.exports.login = (req, res) => {
  const { username, password } = req.body;

  Login.findOne({ username })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            res.json({ success: true, message: "Login successful" });
          } else {
            res
              .status(401)
              .json({ success: false, message: "Invalid password" });
          }
        });
      } else {
        res.status(401).json({ success: false, message: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error querying database: ", error);
      res
        .status(500)
        .json({ success: false, message: "An unexpected error occurred" });
    });
};

module.exports.resetPassword = (req, res) => {
  const { username, hint, newPassword } = req.body;

  Login.findOne({ username, hint })
    .then((user) => {
      if (user) {
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
          if (err) {
            res
              .status(500)
              .json({ success: false, message: "An error occurred" });
          } else {
            user.password = hashedPassword;
            user
              .save()
              .then(() =>
                res.json({
                  success: true,
                  message: "Password changed successfully",
                })
              )
              .catch((error) => {
                console.error("Error saving new password: ", error);
                res
                  .status(500)
                  .json({
                    success: false,
                    message: "An unexpected error occurred",
                  });
              });
          }
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Incorrect username or hint" });
      }
    })
    .catch((error) => {
      console.error("Error querying database: ", error);
      res
        .status(500)
        .json({ success: false, message: "An unexpected error occurred" });
    });
};

// New method to get all admin users
module.exports.getAllAdmins = (req, res) => {
  Login.find({})
    .then((users) => {
      res.json({ success: true, users });
    })
    .catch((error) => {
      console.error("Error querying database: ", error);
      res
        .status(500)
        .json({ success: false, message: "An unexpected error occurred" });
    });
};

module.exports.updateLogin = (req, res) => {
  const { username, password } = req.body;
  const loginId = req.params.id;

  // Hash the password before updating
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: "Failed to hash password" });
    }

    const updatedFields = { username, password: hashedPassword };

    Login.findByIdAndUpdate(loginId, updatedFields, { new: true })
      .then((updatedLogin) => {
        if (!updatedLogin) {
          return res.status(404).json({ error: "Credentials not found" });
        }
        res.status(200).json(updatedLogin);
      })
      .catch((error) =>
        res
          .status(500)
          .json({ error: error.message || "Internal Server Error" })
      );
  });
};