const express = require('express');
const router = express.Router();

const cartController = require('../../controllers/cartController');

router
.get('/:idClient',cartController.getProductsCart)
.patch('/',cartController.setProductCart)
.patch('/addQuantityProduct/:idClient/:productName',cartController.addQuantityProduct)
.patch('/subtractQuantityProduct/:idClient/:productName',cartController.subtractQuantityProduct)
.delete('/:idClient/:productName',cartController.deleteProduct);

module.exports =router;