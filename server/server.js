// import express modulue to define routes and handle https requests
const express = require("express");
const cors = require("cors");
// help to connect to mongodb
const mongoose = require("mongoose");
// allow acces to .env variables
require("dotenv").config();

// create express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connecting to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
