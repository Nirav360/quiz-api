const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const mongoose = require("mongoose");
const questions_routes = require("./routes/questions");
require("dotenv").config();
const cors = require("cors"); // includes cors module

const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api", questions_routes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
