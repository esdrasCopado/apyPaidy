const mongoose = require('mongoose');

const orderPurchase=new mongoose.Schema({
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
})