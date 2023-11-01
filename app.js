const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerSpec = require('./routes/swagger'); // Importa la configuración de Swagger

//Endpoints
const actividadesRoute = require('./endpoints/actividades.js');
const authRoute = require('./endpoints/auth.js');
const salaRoute = require('./endpoints/sala');
const votacionRoute = require('./endpoints/votacion');

//Almaceno instancia de express
const app = express();
app.use(express.json());
//Configuro el cors
let allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4200',
    'https://www.desarrollowebback.duckdns.org',
    'http://www.desarrollowebback.duckdns.org'

];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Middleware para servir la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/auth',authRoute );
app.use('/api/actividades', actividadesRoute);
app.use('/api/sala',salaRoute);
app.use('/api/votacion',votacionRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});

