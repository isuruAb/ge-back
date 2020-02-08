var cors = require("cors");
const express = require("express");
const userRouter = require("./routes/user");
const port = process.env.SERVER_PORT;
require("./db/db.js");
const app = express();
app.use(cors());

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("Server is ready");
});
