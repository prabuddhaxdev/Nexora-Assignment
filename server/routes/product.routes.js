const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
} = require("../controllers/product.controllers");

router.get("/", getProducts);
router.post("/", addProduct);

module.exports = router;
