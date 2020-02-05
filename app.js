const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("./services.js");
const app = express();

app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  const Cat = mongoose.model("Cat", { name: String });
  const kitty = new Cat({ name: "Zildjian" });
  kitty.save().then(() => console.log("meow"));
  res.json({ message: "Hello" });
});
app.listen(3000);
