const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const routes = require("./routes/index");

app.use("/api", routes);

mongoose
  .connect("mongodb://127.0.0.1:27017/crud")
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => console.log("Connected to the server!"));
  })
  .catch((err) => console.log(err));
