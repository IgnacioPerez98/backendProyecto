const conexion = require('../servicios/ServicioMySQL');
const hashing = require('../servicios/SHA512');
const ActividadesHandler = require('../handlers/actividadeshandler');
const {connect} = require("mongodb/src/cmap/connect");


let salaHandler ={
    crearSalaTodasLasActividades : function (nombreSala){
        return new Promise((resolve, reject)=>{
            try {
                let con = conexion.ObtenerConexion("proyectoback");
                ActividadesHandler.getAllActivities().then( (data) => {
                    let sala ={
                        nombre: nombreSala,
                        link :hashing.cifrar(nombreSala),
                        actividades: data,
                        isOpen : false
                    }
                    let consulta = `INSERT INTO juego(nombre, actividades,isOpen) VALUES ('${sala.nombre}', '${JSON.stringify(sala.actividades)}', ${data.isOpen} )`;
                    con.connect();
                    con.query(consulta);
                    resolve(sala);
                }).catch(
                    (e)=>{reject(e);}
                )
            }catch (e){
                reject(e);
            }
        })
    },
    estadoSala: function (estado,hashSala){
        return new Promise((resolve,reject)=>{
           try {
               let con = conexion.ObtenerConexion("proyectoback");
               let consulta = `UPDATE juego SET isOpen = ${estado} WHERE juego.nombre = '${hashSala}'`;
               con.connect();
               con.query(consulta);
               resolve({estado: `Se cambio el estado de la actividad a ${estado}`});

           } catch (e){
               reject(e)
           }
        });
        
    },
    eliminarSala : function (hashSala){
        return new Promise((resolve,reject)=>{
            try {
                let con = conexion.ObtenerConexion("proyectoback");
                let consulta = `DELETE FROM juego WHERE juego.nombre = '${hashSala}'`;
                con.connect();
                con.query(consulta);
                resolve({estado: `Eliminación correcta`});
            }catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = salaHandler;