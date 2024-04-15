const express = require('express');

const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('./database/db');
const config = require('./config-cors');

//rutes of the application
const v1ProductRoutes=require('./v1/routes/productRoutes');
const v1UserRoutes=require('./v1/routes/userRoutes');
const v1DirectionRoutes=require('./v1/routes/directionRoutes');
const v1AmazonRoutes=require('./v1/routes/amazonRoutes');
const v1MercadoRoutes=require('./v1/routes/mercadoPagoRoutes');
const v1CartRoutes=require('./v1/routes/cartRoutes');


const app = express();
const PORT =process.env.PORT || 3000;
app.use(cors());


app.use(express.json());

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads",
    })
);


connectDB();



app.use('/v1/productRoutes', v1ProductRoutes);
app.use('/v1/userRoutes', v1UserRoutes);
app.use('/v1/directionRoutes', v1DirectionRoutes);
app.use('/v1/amazonRoutes', v1AmazonRoutes);
app.use('/v1/mercadoPagoRoutes', v1MercadoRoutes);
app.use('/v1/cartRoutes', v1CartRoutes);

app.get('/', (req, res) => {
    const htmlResponse = "<h1>Welcome to API from 'proyecto integrador'</h1>";
    res.send(htmlResponse);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


