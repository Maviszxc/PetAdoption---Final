const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  hint: {
    type: String,
    required: [true, "Hint is required"],
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});



const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
