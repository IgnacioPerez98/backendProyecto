const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./routes/swagger'); // Importa la configuración de Swagger

//Endpoints
const actividadesRoute = require('./endpoints/actividades.js');
const jugadoresRoute = require('./endpoints/jugadores.js');
const propuestasRoute = require('./endpoints/propuestas.js');

//Almaceno instancia de express
const app = express();

app.use(express.json());
// Middleware para servir la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/actividades', actividadesRoute);
app.use('/api/jugadores', jugadoresRoute );
app.use('/api/propuestas',propuestasRoute );


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});

