const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopDocument = new Schema({
  item: {
    type: String,
    required: [true, "Item name is needed"],
  },
  description: {
    type: String,
    required: [true, "Description is needed"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  cost: {
    type: String,
    required: [true, "Cost is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is needed"],
  },
  isSold: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: [true, "Image is needed"],
  },
});

const Shop = mongoose.model("Shop", shopDocument);
module.exports = Shop;
