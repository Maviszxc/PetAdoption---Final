// controllers/cartController.js
const Cart = require("../models/cartSchema");

module.exports.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  Cart.findOne({ userId })
    .then((cart) => {
      if (cart) {
        // Cart exists, update it
        const itemIndex = cart.items.findIndex(
          (item) => item.productId == productId
        );

        if (itemIndex > -1) {
          // Product exists in the cart, update the quantity
          let productItem = cart.items[itemIndex];
          productItem.quantity += quantity;
          cart.items[itemIndex] = productItem;
        } else {
          // Product does not exist in cart, add new item
          cart.items.push({ productId, quantity });
        }

        cart
          .save()
          .then((updatedCart) => res.json(updatedCart))
          .catch((error) => res.status(500).send(error));
      } else {
        // No cart for the user, create new cart
        Cart.create({ userId, items: [{ productId, quantity }] })
          .then((newCart) => res.json(newCart))
          .catch((error) => res.status(500).send(error));
      }
    })
    .catch((error) => res.status(500).send(error));
};

module.exports.getCart = (req, res) => {
  const { userId } = req.params;

  Cart.findOne({ userId })
    .populate("items.productId")
    .then((cart) => res.json(cart))
    .catch((error) => res.status(500).send(error));
};
