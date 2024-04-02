const cartService = require("../services/cartService");
const productController = require("../controllers/productController");
const shippingCost = 2000;

const setProductCart = (req, res) => {
  const product = req.body.product;
  const idClient = req.body.idClient;
  const result = cartService.addProductCart(idClient, product);
  if (result) {
    res.json({ status: 200, message: "Product added to cart" });
  } else {
    res.json({ status: 400, message: "Error adding product to cart" });
  }
};

/**
 * get all products of cart from client id
 * @param {idClient} req 
 * @param {Response} res 
 * @returns 
 */
const getProductsCart = async (req, res) => {
  try {
    const idClient = req.params.idClient;
    
    const result = await cartService.findProductList(idClient);
    if (!result) {
      return res
        .status(400)
        .json({ status: 400, message: "Error getting product from cart" });
    }
    const { products, totalCost } = result;
    const productsLength = getLengthProducts(products);
    const shCost=shippiCost(totalCost);
    const productsUrl = await productController.getUrlProduct(products);
    return res.status(200).json({ status: 200, data: productsUrl, shippingCost: shCost, totalCost: totalCost,productsLength:productsLength });
  } catch (err) {
    console.error('Error in getProductsCart:', err.message);
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};
const addQuantityProduct = async (req, res) => {
  try {
    const idClient = req.params.idClient;
    const productName = req.params.productName;
    
    const result = await cartService.AddProductQuantity(idClient, productName);
    
    if (result) {
      res.json({ status: 200, message: "Product quantity added to cart" });
    } else {
      res.json({ status: 400, message: "Error adding product to cart" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};


const subtractQuantityProduct=(req, res) => {
  const idClient = req.params.idClient;
  const productName = req.params.productName;
  const result = cartService.subtractQuantityProduct(idClient, productName);
  if (result) {
    res.json({ status: 200, message: "Product quantity subtract -1 from cart" });
  } else {
    res.json({ status: 400, message: "Error subtract product from cart" });
  }
}

const deleteProduct=(req, res) => {
  const idClient = req.params.idClient;
  const idProduct = req.params.productName;
  const result = cartService.deleteProductCart(idClient, idProduct);
  if (result) {
    res.json({ status: 200, message: "Product deleted from cart" });
  } else {
    res.json({ status: 400, message: "Error deleting product from cart" });
  }
}

function getLengthProducts(products){
    return products.length;
}
function shippiCost(totalCost){
    if(totalCost>shippingCost){
        return "Envio Gratis";
    }else{
        return 200;
    }

}



module.exports = { setProductCart, getProductsCart , addQuantityProduct , subtractQuantityProduct, deleteProduct};
