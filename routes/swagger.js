const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API BackEnd Proyecto Final',
      version: '1.0.0',
      description: 'API BackEnd Proyecto Final',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your Bearer token in the format "Bearer {token}"',
        },
      },
    },
  },
  apis: [
    './endpoints/actividades.js',
    './endpoints/sala.js',
    './endpoints/votacion.js',
    './endpoints/auth.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;


