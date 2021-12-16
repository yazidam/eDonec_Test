const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/Sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product dont found");
  }
};
module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
};
