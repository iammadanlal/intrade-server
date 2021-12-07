const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  subCategory: { type: String },
  image: [String],
  rating: {
    rate: { type: Number },
    count: { type: Number },
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
