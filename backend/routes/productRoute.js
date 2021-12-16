const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getProductById).delete(deleteProduct);
module.exports = router;
