require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const cateRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use("/uploads/images", express.static("uploads"));
app.use("/", [authRoutes, productRoutes]);
app.use("/category", cateRoutes);

//Listen to port: Default is 4000
const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("listening to port ", port);
});

module.exports = app;
