const mongoose = require('mongoose');

const cart = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: false
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});
const Cart = mongoose.model('cart', cart,"eShop");

module.exports = Cart;
