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
  apis: [
    './endpoints/actividades.js',
    './endpoints/jugadores.js',
    './endpoints/propuestas.js',
    './endpoints/auth.js'

  ], // Ruta al archivo de rutas con comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;


