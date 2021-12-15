const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  logOut,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile);
router.get("/logout", logOut);

module.exports = router;
