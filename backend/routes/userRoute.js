const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  logOut,
  updateUserProfile,
} = require("../controllers/userController");
const { validRegister } = require("../middleware/validation");

router.post("/", validRegister, registerUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.get("/logout", logOut);

module.exports = router;
