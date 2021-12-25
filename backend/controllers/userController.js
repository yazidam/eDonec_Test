const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(
  "971874584120-fa39pgif9p2tk3rqhmue4glhk02as2tf.apps.googleusercontent.com"
);
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    console.log("User alredy Exist");
  }
  const hashedPsw = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPsw,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
};

const authUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      console.log("loginnn");
    } else {
      res.status(401);
      throw new Error("invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user dont found");
  }
};

const logOut = async (req, res) => {
  res.status(200).send({ token: null, msg: "Logout" });
  console.log("user logout");
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user dont found");
  }
};
const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const verify = await client.verifyIdToken({
      idToken: tokenId,
    });
    console.log("ver", verify);
    const { email_verified, email, name } = verify.payload;
    const password = email + process.env.GOOGLE_SERCRET;
    const passwordHash = await bcrypt.hash(password, 10);
    if (!email_verified) return res.status(400).json({ msg: "email invalid" });

    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "password is incorrect" });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      console.log("login with oAuth");
    } else {
      const newUser = await User.create({
        name,
        email,
        password: passwordHash,
      });
      await newUser.save();
      console.log("user added");
      res.json({
        _id: newUser._id,
        name: newUser.name, //hethi eli t3ml register
        email: newUser.email,
        // password: newUser.password,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      });
    }
  } catch (error) {
    res.status(404);

    console.log("err", error);
  }
};
module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  googleLogin,
  updateUserProfile,
  logOut,
};
