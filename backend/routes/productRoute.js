const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} = require("../controllers/productController");
const admin = require("../middleware/adminMidleware");
const protect = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
module.exports = router;
