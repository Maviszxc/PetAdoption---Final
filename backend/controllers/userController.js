// controllers/userController.js
const User = require("../models/userSchema");

module.exports.createUser = (req, res) => {
  const { name, address, contactNumber } = req.body;

  User.create({ name, address, contactNumber })
    .then((newUser) => res.json(newUser))
    .catch((error) => res.status(500).send(error));
};
