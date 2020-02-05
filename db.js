const mongoose = require("mongoose");
mongoose.connect("mongodb://ge_user:ge_pass1@ds033429.mlab.com:33429/ge_db", {
  useNewUrlParser: true
});

const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow"));
