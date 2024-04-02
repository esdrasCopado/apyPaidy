const cartModel = require("../database/cart");
const productModel = require("../database/product");

/**
 * save produt in database cart model
 * @param {number} idClient
 * @param {string} nameProduct
 * @returns
 */
const addProductCart = async (idClient, nameProduct) => {
  try {
    // Buscar el producto por su nombre
    const product = await productModel.findOne({ name: nameProduct });
    if (!product) {
      throw new Error("Product not found");
    }
    const cart = await cartModel.findOne({ user: idClient });
    if (!cart) {
      throw new Error("Cart not found");
    }
    const existingProduct = cart.products.find((item) =>
      item.product.equals(product._id)
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: product._id, quantity: 1 });
    }
    await cart.save();
    return true;
  } catch (e) {
    console.error(e.message);
    return false;
  }
};
/**
 * get all products in cart of the specified client
 * @param {number} idClient
 * @returns all products in the cart
 */
const findProductList = async (idClient) => {
  try {
    // Obtener el carrito del usuario
    const cart = await cartModel.findOne({ user: idClient });
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Obtener todos los productos en el carrito
    const productIds = cart.products.map((product) => product.product);
    const productsFound = await productModel.find({ _id: { $in: productIds } });

    // Calcular el costo total
    let totalCost = 0;
    const productsWithQuantities = productsFound.map((product) => {
      const cartProduct = cart.products.find((item) =>
        item.product.equals(product._id)
      );
      const quantity = cartProduct ? cartProduct.quantity : 0; // Si no se encuentra el producto en el carrito, asigna 0 como cantidad
      totalCost += product.price * quantity;
      // Devuelve un nuevo objeto producto con la cantidad agregada
      return {
        ...product.toObject(), // Convierte el objeto Mongoose a un objeto plano
        quantity: quantity,
      };
    });

    return { products: productsWithQuantities, totalCost };
  } catch (e) {
    console.error(e.message);
    return null;
  }
};



const AddProductQuantity = async (idClient, nameProduct) => {
    try {
        
        const cart = await cartModel.findOne({ user: idClient });
        if (!cart) {
            throw new Error("Cart not found");
        }
        
        const product = await productModel.findOne({ name: nameProduct });
        if (!product) {
            throw new Error("Product not found");
        }

        const index = cart.products.findIndex((item) => item.product.equals(product._id));
        if (index !== -1) {
            cart.products[index].quantity += 1;
        }
        
        await cart.save();
        return true;
    } catch (e) {
        console.error(e.message);
        return false; 
    }
};


const subtractQuantityProduct = async (idClient, nameProduct) => {
    try {
        const cart = await cartModel.findOne({ user: idClient });
        if (!cart) {
            throw new Error("Cart not found");
        }
        
        const product = await productModel.findOne({ name: nameProduct });
        if (!product) {
            throw new Error("Product not found");
        }
        

        const index = cart.products.findIndex((item) => item.product.equals(product._id));
        if (index !== -1) {
            cart.products[index].quantity -= 1;
        }
        
        await cart.save();
        return true;
    } catch (e) {
        console.error(e.message);
        return false; 
    }
};

const deleteProductCart = async (idClient, nameProduct) => {
    try {
        // Encuentra el carrito basado en el ID del usuario
        const cart = await cartModel.findOne({ user: idClient });
        if (!cart) {
            throw new Error("Cart not found");
        }
        const product = await productModel.findOne({ name: nameProduct });
        if (!product) {
            throw new Error("Product not found");
        }
        
        // Encuentra si el producto existe en el carrito
        const index = cart.products.findIndex((item) => item.product.equals(product._id));
        if (index === -1) {
            throw new Error("Product not found in cart");
        }

        // Remueve el producto del arreglo
        cart.products.splice(index, 1);

        // Guarda los cambios en el carrito
        await cart.save();
        return true;
    } catch (e) {
        console.error(e.message);
        return false; 
    }
}


module.exports = { AddProductQuantity, findProductList, addProductCart , deleteProductCart, subtractQuantityProduct};
