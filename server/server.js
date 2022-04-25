const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

const { PORT } = process.env;

const newInput = require("./routes/prompts");


app.use(express.json());
app.use(cors());

app.use("/posts", newInput);

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
