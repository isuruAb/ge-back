var cors = require("cors");
const express = require("express");
const userRouter = require("./routes/user");
const port = process.env.SERVER_PORT;
const conn = require("./db/db.js");
const app = express();
conn.connect();
app.use(cors());

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("Server is ready");
});

module.exports = app;
