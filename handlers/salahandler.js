const conexion = require('../servicios/ServicioMySQL');
const hashing = require('../servicios/SHA512');
const ActividadesHandler = require('../handlers/actividadeshandler');
const {connect} = require("mongodb/src/cmap/connect");


let salaHandler ={
    crearSalaTodasLasActividades : function (){
        return new Promise((resolve, reject)=>{
            try {
                let con = conexion.ObtenerConexion("proyectoback");
                ActividadesHandler.getAllActivities().then( (data) => {
                    let sala ={
                        nombre: hashing.cifrar(Date.now().toString()),//crea un nombre a partir de la fecha actual, por lo que es unico
                        actividades: data,
                        isOpen : false
                    }
                    let consulta = `INSERT INTO juego(nombre, actividades,isOpen) values ('${sala.nombre}', '${JSON.stringify(sala.actividades)}', ${data.isOpen} )`;
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
               let consulta = `UPDATE juego SET isOpen = ${estado} WHERE juego.nombre = ${hashSala}`;
               con.connect();
               con.query(consulta);

           } catch (e){
               reject(e)
           }
        });
        
    },
    cerrarSala : function (hashSala){
        return new Promise((resolve,reject)=>{

        })
    }
}

module.exports = salaHandler;