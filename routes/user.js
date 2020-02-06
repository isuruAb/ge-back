const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Signup new user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Login a registered user
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    const { _id, name } = user;
    res.send({ _id, name, token });
  } catch (error) {
    res.status(400).send(error);
  }
});
// Renew token
router.post("/users/token", auth, async (req, res) => {
  try {
    const { user } = req;
    const { _id, name } = user;
    const valid_time =
      Math.floor(Math.random() * process.env.JWT_EXPIRY_TIME_MAX) +
      +process.env.JWT_EXPIRY_TIME_MIN;
    const new_token = jwt.sign(
      { _id: user._id, valid_time },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * valid_time
      }
    );
    res.send({ _id, name, token: new_token });
  } catch (error) {
    res.status(400).send(error);
  }
});
// Show inner pages after login
router.get("/users/info", auth, async (req, res) => {
  const { _id, name, email } = req.user;
  res.send({ _id, name, email });
});
// Log user out of the application
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send({ message: "user logout successful" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
