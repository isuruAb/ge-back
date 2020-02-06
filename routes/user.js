const express = require("express");
const User = require("../models/User");

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
router.post("/users/login", async (req, res) => {
  //Login a registered user

  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();

    res.send({ _id: user._id, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;