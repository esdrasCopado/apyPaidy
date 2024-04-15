const mongoose = require('mongoose');

const userDirection= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    directions: [
        {
            directio:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Direction',
                required: false
            }
        }
    ]
})

const UserDirections = mongoose.model('Directions', userDirection,"UserDirections");

module.exports = UserDirections;