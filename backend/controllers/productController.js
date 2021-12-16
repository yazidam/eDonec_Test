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
module.exports = {
  createProduct,
  getProducts,
};
