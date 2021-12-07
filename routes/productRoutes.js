const { Router } = require("express");
const productController = require("../controllers/productController");

const router = Router();

router.post("/product/create", productController.create_product);

router.delete("/product/delete", productController.delete);

router.get("/products", productController.get_all_products);

router.get("/products/featured", productController.get_featured_products);

router.get("/products/:subcate", productController.get_products_by_subcate);

router.get("/product/:id", productController.get_product_by_id);

module.exports = router;
