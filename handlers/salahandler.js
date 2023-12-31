const conexion = require('../servicios/ServicioMySQL');
const hashing = require('../servicios/SHA512');
const ActividadesHandler = require('../handlers/actividadeshandler');


let salaHandler ={
    crearSalaConActividades : function (nombreSala,actividades){
        return new Promise((resolve, reject)=>{
            try {
                let con = conexion.ObtenerConexion("proyectoback");
                ActividadesHandler.getAllActivities().then( (data) => {
                    let sala ={
                        nombre: nombreSala,
                        link :hashing.cifrar(nombreSala),
                        actividades: actividades,
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
    asociarActividadesSeleccionadasConJuego: function (nombreJuego, actividadesSeleccionadas) {
        return new Promise((resolve, reject) => {
            try {
                let con = conexion.ObtenerConexion("proyectoback");
                con.connect();

                actividadesSeleccionadas.forEach((actividadId) => {
                    let consulta = `INSERT INTO juegoactividad(nombre_juego, id_actividad, votos) VALUES ('${nombreJuego}', ${actividadId}, 0)`;
                    con.query(consulta, (error) => {
                        if (error) {
                            reject(error);
                        }
                    });
                });

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    crearSalaConActividadesSeleccionadas: function (nombreSala, actividadesSeleccionadas) {
        return new Promise((resolve, reject) => {
            try {
                let con = conexion.ObtenerConexion("proyectoback");
    
                let consulta = `INSERT INTO juego(nombre, isOpen) VALUES ('${nombreSala}', false)`;
    
                con.connect();
    
                con.query(consulta, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        // Obtener el ID de la sala recién creada
                        const salaId = results.insertId;
    
                        // Asociar las actividades seleccionadas con la sala
                        actividadesSeleccionadas.forEach((actividadId) => {
                            let consultaAsociacion = `INSERT INTO juegoactividad(nombre_juego, id_actividad, votos_positivos, votos_negativos, votos_neutrales) VALUES ('${nombreSala}', ${actividadId}, 0, 0, 0)`;
                            con.query(consultaAsociacion, (asociacionError) => {
                                if (asociacionError) {
                                    reject(asociacionError);
                                }
                            });
                        });
    
                        resolve({ nombre: nombreSala, link: hashing.cifrar(nombreSala), isOpen: false, actividades: actividadesSeleccionadas });
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
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
                let consulta = `
                SELECT 
                        json_object('nombre', juego.nombre, 'isOpen', juego.isOpen, 'actividades', JSON_ARRAYAGG(json_object('id_actividad', juegoactividad.id_actividad, 'titulo', actividades.titulo, 'descripcion', actividades.descripcion, 'image', actividades.image))) as response
                    FROM 
                        juego
                    LEFT JOIN 
                        juegoactividad ON juego.nombre = juegoactividad.nombre_juego
                    LEFT JOIN 
                        actividades ON juegoactividad.id_actividad = actividades.id
                    WHERE 
                        juego.nombre = '${nombresala}';
                `;
                con.query(consulta, (bad,ok)=>{
                    try{
                        const {response} = ok[0];
                        resolve(response);
                    }catch (error){
                        reject(error);
                    }
                })
            }catch (error){
                console.log(error);
                reject(null);
            }
        })


    },
    votarActividad: function (nombreSala, idActividad, voto) {
        return new Promise((resolve, reject) => {
            try {
                const con = conexion.ObtenerConexion("proyectoback");
                con.connect();

                // Actualizar la tabla juegoactividad con el voto correspondiente
                const consulta = `UPDATE juegoactividad SET votos_positivos = votos_positivos + ${voto === 1 ? 1 : 0}, votos_negativos = votos_negativos + ${voto === -1 ? 1 : 0}, votos_neutrales = votos_neutrales + ${voto === 0 ? 1 : 0} WHERE nombre_juego = '${nombreSala}' AND id_actividad = ${idActividad}`;

                con.query(consulta, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    obtenerSalasConActividades: function () {
    return new Promise((resolve, reject) => {
      try {
        let con = conexion.ObtenerConexion("proyectoback");
        con.connect();
        let consulta = `SELECT juego.nombre, juego.isOpen, 
                               GROUP_CONCAT(JSON_OBJECT('id_actividad', ja.id_actividad, 
                                                     'votos_positivos', ja.votos_positivos,
                                                     'votos_negativos', ja.votos_negativos,
                                                     'votos_neutrales', ja.votos_neutrales)) as actividades
                        FROM juego
                        LEFT JOIN juegoactividad ja ON juego.nombre = ja.nombre_juego
                        GROUP BY juego.nombre`;
        con.query(consulta, (error, result) => {
          if (error) {
            reject(error);
          } else {
            let salas = result.map((sala) => {
              return {
                nombre: sala.nombre,
                isOpen: sala.isOpen,
                actividades: sala.actividades ? JSON.parse(`[${sala.actividades}]`) : [],
              };
            });

            if (salas.length === 0) {
              resolve({ mensaje: "No hay salas disponibles." });
            } else {
              resolve(salas);
            }
          }
        });
      } catch (error) {
        console.log(error);
        reject(null);
      }
    });
  },

    
    obtenerVotosPorSala: function (nombreSala) {
        return new Promise((resolve, reject) => {
            try {
                let con = conexion.ObtenerConexion("proyectoback");

                let consulta = `SELECT id_actividad, votos_positivos, votos_negativos, votos_neutrales FROM juegoactividad WHERE nombre_juego = '${nombreSala}'`;

                con.connect();

                con.query(consulta, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = salaHandler;