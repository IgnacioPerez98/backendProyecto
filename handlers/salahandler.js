const conexion = require('../servicios/ServicioMySQL');
const hashing = require('../servicios/SHA512');
const ActividadesHandler = require('../handlers/actividadeshandler');


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
                    let consulta = `INSERT INTO juego(nombre, actividades,isOpen) VALUES ('${sala.nombre}', '${JSON.stringify(sala.actividades)}', ${sala.isOpen} )`;
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
    estadoSala: function (estado,nombreSala){
        return new Promise((resolve,reject)=>{
           try {
               let con = conexion.ObtenerConexion("proyectoback");
               let consulta = `UPDATE juego SET isOpen = ${estado} WHERE juego.nombre = '${nombreSala}'`;
               con.connect();
               con.query(consulta);
               resolve({message: `Se cambio el estado de la actividad a ${estado}`});

           } catch (e){
               reject(e)
           }
        });
    },
    eliminarSala : function (nombresala){
        return new Promise((resolve,reject)=>{
            try {
                let con = conexion.ObtenerConexion("proyectoback");
                let consulta = `DELETE FROM juego WHERE juego.nombre = '${nombresala}'`;
                con.connect();
                con.query(consulta);
                resolve({estado: `Eliminación correcta`});
            }catch (e) {
                reject(e);
            }
        })
    },
    conectarasala: function (nombresala){
        return new Promise((resolve, reject)=>{
            try {
                let con = conexion.ObtenerConexion("proyectoback");
                con.connect();
                let consulta = `SELECT json_object('nombre', nombre, 'actividades', actividades, 'isOpen', isOpen) as response from juego where nombre = '${nombresala}'`;
                con.query(consulta, (bad,ok)=>{
                    try{
                        resolve(JSON.parse(ok[0].response));
                    }catch (error){
                        reject(error);
                    }
                })
            }catch (error){
                console.log(error);
                reject(null);
            }
        })


    }
}

module.exports = salaHandler;