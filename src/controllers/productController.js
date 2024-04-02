
const productServices= require('../services/productService');
const amazonController= require('../controllers/amazonAWSController');

const getAllProducts = async (req, res) => {
    try {
        const productList = await productServices.getAllProducts();
        const urlProducts = await getUrlProduct(productList);
        res.status(200).json({ status: 'OK', data: urlProducts });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ status: 'Error', message: 'Error al obtener productos' });
    }
};
/**
 * Obtiene la URL de los productos
 * @param {array} productList - Lista de productos
 * @returns {array} Lista de productos con las URLs de las imágenes
 */
async function getUrlProduct(productList) {
    try {
        const productsWithUrls = [];
        for (const product of productList) {
            const key = product.image;
            const response = await fetch('http://localhost:3000/v1/amazonRoutes/' + key);
            const data = await response.json(); // Espera a que la promesa se resuelva
            product.image = data.url; // Asigna la URL a la propiedad image del producto
            productsWithUrls.push(product);
        }
        return productsWithUrls;
    } catch (error) {
        console.error("Error obteniendo URL del producto:", error);
        return [];
    }
}
const getAllByName=(req,res)=>{
    try{

    }catch (error) {
        console.error("Error al obtener productos por nombre:", error);
        res.status(500).json({ status: 'Error', message: 'Error al obtener productos por nombre' });
    }

};
const createProduct = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        console.log(name, description, price, image);
        if (!name || !description || !price || !image) {
            return res.status(400).json({ message: 'do not have required parameters' });
        }
        const newProduct = {
            name: name,
            description: description,
            price: price,
            image: image
        }
        const productResult = await productServices.createProduct(newProduct);
        res.status(200).json({ status: 'OK', message: productResult });
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: e.message });
    }
};
const deleteProduct=(req,res)=>{};
const updateProduct=(req,res)=>{};

module.exports={getAllProducts,getAllByName,createProduct,deleteProduct,updateProduct,getUrlProduct};