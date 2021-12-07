const { Router } = require("express");
const categoryController = require("../controllers/categoryController");

const router = Router();

// Routes for get all categories
router.get("/list", categoryController.getCategories);

//Routes for create cagetory
router.post("/create", categoryController.createCategory);

// delete category
router.delete("/delete", categoryController.deleteCategory);

module.exports = router;
