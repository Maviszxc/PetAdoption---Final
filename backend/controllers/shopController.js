// backend/controllers/shopController.js

const Shop = require("../models/shopSchema");
const multer = require("multer");

// Setup for file storage using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports.upload = upload;

module.exports.items = (req, res) => {
  Shop.find({ isSold: false })
    .then((items) => res.send(items))
    .catch((error) => res.status(500).send(error));
};

module.exports.fetchItems = async (req, res) => {
  try {
    const items = await Shop.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.createItem = async (req, res) => {
  try {
    const { item, description, type, cost, quantity, isSold } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const image = req.file.path;

    const newItem = new Shop({
      item,
      description,
      type,
      cost,
      quantity,
      isSold,
      image,
    });

    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.updateItem = async (req, res) => {
  try {
    const item = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    res.json({ success: true, item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    const item = await Shop.findByIdAndDelete(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    res.json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.itemsByType = async (req, res) => {
  try {
    const items = await Shop.find({ type: req.params.type });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
