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
    res.status(201).send({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Login a registered user
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (user && user.error) {
      return res.status(401).send({ error: user.error });
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
    const valid_time = 60 * 24;
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
