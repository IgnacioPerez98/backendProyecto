const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API BackEnd Proyecto Final',
      version: '1.0.0',
      description: 'API BackEnd Proyecto Final',
    },
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your Bearer token in the format "Bearer {token}"',
      }
    },
  },
  apis: [
    './endpoints/actividades.js',
    './endpoints/jugadores.js',
    './endpoints/propuestas.js',
    './endpoints/auth.js'

  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;


