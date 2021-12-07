const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isInNav: {
    type: Boolean,
    default: false,
  },
  similarCates: [],
});

const categorySchema = new mongoose.Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  subCategories: [subCateSchema],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
