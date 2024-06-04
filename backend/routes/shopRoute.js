const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/items", shopController.items); // Adjusted route to use items method for unsold items
router.get("/", shopController.fetchItems); // Fetch all items
router.get("/type/:type", shopController.itemsByType); // Fetch items by type
router.post(
  "/create",
  shopController.upload.single("image"),
  shopController.createItem
); // Create item with image upload
router.put("/update/:id", shopController.updateItem); // Update item
router.delete("/delete/:id", shopController.deleteItem); // Delete item

module.exports = router;
