const mongoose = require("mongoose");
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;
