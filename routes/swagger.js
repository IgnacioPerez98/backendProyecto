const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API BackEnd Proyecto Final',
      version: '1.0.0',
      description: 'API BackEnd Proyecto Final',
    },
  },
  apis: ['./routes/api.js'], // Ruta al archivo de rutas con comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
