const mongoose = require('mongoose');

const productShema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
const directions = mongoose.model('Product', productShema);

module.exports = directions;
