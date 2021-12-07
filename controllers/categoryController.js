const Category = require("../models/category");

module.exports.getCategories = async (req, res) => {
  try {
    const cates = await Category.find();
    res.status(201).json(cates);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.createCategory = async (req, res) => {
  const { name, subCategories } = req.body;
  try {
    const cate = await Category.create({ name, subCategories });
    res.status(201).json(cate);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.deleteCategory = async (req, res) => {
  const { id } = req.body;
  try {
    const cate = await Category.deleteOne({ _id: id });
    res.status(201).json(cate);
  } catch (err) {
    res.status(400).json(err);
  }
};
