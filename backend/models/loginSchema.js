const mongoose = require("mongoose");

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
  active: {
    type: Boolean,
    default: true,
  },
});

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
