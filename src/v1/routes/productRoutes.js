const express = require("express");

const router = express.Router();
const productRoutes = require('../../controllers/productController');

router
  .get("/",productRoutes.getAllProducts)
  .get("/:getByName", productRoutes.getAllByName)
  .post("/",productRoutes.createProduct)
  .patch("/:productoID",productRoutes.updateProduct)
  .delete("/:productoID",productRoutes.deleteProduct);

  module.exports = router;

