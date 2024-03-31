const productModel = require('../database/product');

const getAllProducts = async() => {
    try {
    const products = await productModel.find();
    return products;
    } catch (err) {
        console.error(err);
    }
};

const createProduct = async (product) => {
    try {
        const { name, description, price, image } = product;
        const newProduct = new productModel({
            name,
            description,
            price,
            image
        });
        const productResult = await newProduct.save();
        console.log("Product saved:", productResult);
        return productResult;
    } catch (error) {
        console.error("Error saving product:", error);
        throw error; // Asegura que los errores se propaguen para que puedan ser manejados adecuadamente en el controlador
    }
};

module.exports = {
    getAllProducts,
    createProduct
}