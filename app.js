const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerSpec = require('./routes/swagger'); // Importa la configuración de Swagger


//WEbSocket

const http = require('http');
const WebSocket = require('ws');

//Endpoints
const actividadesRoute = require('./endpoints/actividades.js');
const authRoute = require('./endpoints/auth.js');
const salaRoute = require('./endpoints/sala');
const votacionRoute = require('./endpoints/votacion');
const webSocketEndpoint = require('./endpoints/salawebsocket')

//Almaceno instancia de express
const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//Endpoint de WebSocket
webSocketEndpoint.setWS(wss);
webSocketEndpoint.wsCreateCon();

app.use(express.static('public'));

app.use(cors({
  origin: function(origin, callback){
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
// app.listen(PORT, () => {
//   console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
// });
server.listen(PORT, ()=>{
    console.log("Express y WebSocket en el puerto 3000")
})

