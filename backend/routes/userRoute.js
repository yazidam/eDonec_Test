const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile);

module.exports = router;
