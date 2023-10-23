const ServicioMongo = require("../servicios/ServicioMongoDB");

 async function CargarDatos(){
    ServicioMongo.crearDatabase("actividades");
    ServicioMongo.crearCollection("actividades","listadoactividades");
    ServicioMongo.insertarEnColeccion("actividades", "listadoactividades",{ nombre:"Actividad 1"});
    ServicioMongo.insertarEnColeccion("actividades", "listadoactividades",{ nombre:"Actividad 2"});
    ServicioMongo.insertarEnColeccion("actividades", "listadoactividades",{ nombre:"Actividad 3"});
}

module.exports = {
     CargarDatos
}