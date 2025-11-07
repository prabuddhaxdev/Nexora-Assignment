const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.models");

router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.find({ userId }).populate("productId");

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );
  const receipt = {
    total,
    timestamp: new Date().toISOString(),
  };

  await Cart.deleteMany({ userId });
  res.json(receipt);
});

module.exports = router;
