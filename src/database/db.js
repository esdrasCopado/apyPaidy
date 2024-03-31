require('dotenv').config({ path: `${__dirname}/../../.env` });
const mongoose = require('mongoose');




async function connectDB() {
    try {
        const conetction = process.env.MONGO_URL;
        console.log(conetction);
        await mongoose.connect(conetction, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log('Conectado a MongoDB.');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
    }
}

module.exports = connectDB;
