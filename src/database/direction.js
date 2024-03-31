const mongoose = require('mongoose');

const directionSchema = new mongoose.Schema({
    user: String,
    StreetNumber: String,
    StreetName: String,
    State: String,
    ZIPCode: String,
    Country: String,
    Neighborhood: String,
    DeliveryInstructions: String
});

const Direction = mongoose.model('Direction', directionSchema);

module.exports = Direction;