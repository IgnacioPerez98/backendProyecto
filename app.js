const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./routes/swagger'); // Importa la configuración de Swagger
const apiRoutes = require('./routes/api'); // Importa las rutas de la API

const app = express();

// Middleware para servir la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});

