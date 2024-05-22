const Shop = require("../models/shopSchema");

const mongoose = require("mongoose");

module.exports.items = (req, res) => {
  Shop.find({ isSold: false })
    .then((items) => res.send(items))
    .catch((error) => res.status(500).send(error)); // Added status code for error
};