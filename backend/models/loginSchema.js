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
  active: {
    type: Boolean,
    default: true,
  },
});

loginSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) return next(err);
      this.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
