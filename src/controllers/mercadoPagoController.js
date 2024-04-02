const mercadoPagoServices=require('../services/mercadoPagoService');
const { MercadoPagoConfig, Preference, Payment } =require("mercadopago");

const client = new MercadoPagoConfig({
    accessToken:
    "APP_USR-6954976907151707-021921-7ce64222e6ab3fdf97952bbdc7262bb8-177908791",
})

const createPreferences =async (req, res) => {
    try {
      try {
        const body = {
          items: [
            {
              title: req.body.title,
              quantity: Number(req.body.quantity),
              unit_price: Number(req.body.price),
              currency_id: "MXN",
            },
          ],
          back_urls: {
            success: "https://botasjusaino.netlify.app/",
            failure: "https://botasjusaino.netlify.app/e-shop.html",
            pending: "https://botasjusaino.netlify.app/e-shop.html",
          },
          auto_return: "approved",
        };
    
        const preference = new Preference(client);
        const result = await preference.create({ body });
    
        res.json({ id: result.id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la preferencia :(" });
      }
    } catch (error) {
        res.json({status:500,message:error.message});
    }
};

module.exports = { createPreferences };
