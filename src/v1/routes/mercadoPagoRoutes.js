const express = require('express')

const route= express.Router();
const mercadoPagoController= require('../../controllers/mercadoPagoController');

route.post('/createPreferences', mercadoPagoController.createPreferences);

module.exports =route;