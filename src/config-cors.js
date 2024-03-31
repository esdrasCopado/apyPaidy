const config = {
    application: {
      cors: {
        server: [
          {
            origin: ["http://localhost", "https://proyectointegradoritson.netlify.app"],
            credentials: true
          }
        ]
      }
    }
  };
  
  module.exports = config;