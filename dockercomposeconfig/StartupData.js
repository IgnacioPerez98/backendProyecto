const ServicioMongo = require("../servicios/ServicioMongoDB");


async function CargarDatos(){
    ServicioMongo.crearDatabase("actividades");
    ServicioMongo.crearCollection("actividades","listadoactividades");
    ServicioMongo.insertarEnColeccion("actividades", "listadoactividades",{ nombre:""});
    ServicioMongo.insertarEnColeccion("actividades", "listadoactividades",{ nombre:""});
    ServicioMongo.insertarEnColeccion("actividades", "listadoactividades",{ nombre:""});
}