const Product = require("../models/product");

module.exports.create_product = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

module.exports.get_all_products = async (req, res) => {
  const products = await Product.find();
  res.status(201).json(products);
};

module.exports.get_featured_products = async (req, res) => {
  const products = await Product.find().limit(8);
  res.status(201).json(products);
};

module.exports.get_products_by_subcate = async (req, res) => {
  const { subcate } = req.params;
  const products = await Product.find({ subCategory: subcate });
  res.status(201).json(products);
};

module.exports.get_product_by_id = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(201).json(product);
};

module.exports.delete = async (req, res) => {
  const {
    body: { id },
  } = req;
  const product = await Product.deleteOne({ _id: id });
  res.status(201).json(product);
};
