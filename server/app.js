require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
var cookies = require("cookie-parser");

app.use(cors({ origin: true, credentials: true }));
app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(morgan("dev"));

const api = require("./api");
app.use("/api", api);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
