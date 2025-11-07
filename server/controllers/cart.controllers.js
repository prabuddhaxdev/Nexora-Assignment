import CartItem from "../models/Cart.models.js";

// GET /cart/:userId
export const getCart = async (req, res) => {
  const { userId } = req.params;
  const cart = await CartItem.find({ userId }).populate("productId");
  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );
  res.json({ cart, total });
};

// POST /cart
export const addToCart = async (req, res) => {
  const { userId, productId, qty } = req.body;

  const existing = await CartItem.findOne({ userId, productId });
  if (existing) {
    existing.qty += qty;
    await existing.save();
  } else {
    await CartItem.create({ userId, productId, qty });
  }

  const updated = await CartItem.find({ userId }).populate("productId");
  res.json(updated);
};

// DELETE /cart/:userId/:productId
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  await CartItem.deleteOne({ userId, productId });
  const updated = await CartItem.find({ userId }).populate("productId");
  res.json(updated);
};

// POST /cart/checkout/:userId
export const checkout = async (req, res) => {
  const { userId } = req.params;
  const cart = await CartItem.find({ userId }).populate("productId");

  const total = cart.reduce((sum, i) => sum + i.productId.price * i.qty, 0);
  const receipt = { total, timestamp: new Date().toISOString() };

  await CartItem.deleteMany({ userId });
  res.json(receipt);
};
