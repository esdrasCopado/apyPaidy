const mercadoPagoServices=require('../services/mercadoPagoService');
const { MercadoPagoConfig, Preference, Payment } =require("mercadopago");

const client = new MercadoPagoConfig({
    accessToken:
    "TEST-5661331155925102-040303-d8f78151f57c692de6b0925ea6ba14e8-177908791",
})

const createPreferences = async (req, res) => {
  try {
      const items = req.body.products;

      if (!Array.isArray(items) || items.length === 0) {
          return res.status(400).json({ error: "No se proporcionaron elementos en el cuerpo de la solicitud." });
      }

      const productItems = items.map(item => ({
          title: item.title,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "MXN",
      }));

      const body = {
          items: productItems,
          back_urls: {
              success: "https://proyectointegradoritson.netlify.app/purchasesuccessfullycomplet",
              failure: "https://proyectointegradoritson.netlify.app/failedpurchase",
              pending: "https://proyectointegradoritson.netlify.app/e-shop",
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
};



module.exports = { createPreferences };
