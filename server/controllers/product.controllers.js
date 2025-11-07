import Product from "../models/Product.models";

// GET /products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST /products
export const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const product = await Product.create({ name, price, image });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
