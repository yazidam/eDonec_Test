const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  logOut,
  updateUserProfile,
  googleLogin,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const { validRegister } = require("../middleware/validation");

router.post("/", validRegister, registerUser);
router.post("/google_login", googleLogin);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.get("/logout", logOut);

module.exports = router;
