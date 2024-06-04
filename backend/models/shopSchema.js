const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isSold: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Shop", shopSchema);
