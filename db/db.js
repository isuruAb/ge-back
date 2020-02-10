const mongoose = require("mongoose");

function connect() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
}
function disconnect() {
  mongoose.disconnect();
}

module.exports = { connect, disconnect };
