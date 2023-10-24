const conexion = require('../servicios/ServicioMySQL')
const {json} = require("express");

let actividadesHandler = {

    getAllActivities : function(){
        return new Promise((resolve, reject) => {
            const consulta = `SELECT JSON_ARRAYAGG(JSON_OBJECT('titulo', titulo, 'descripcion', descripcion, 'image', image)) as response FROM actividades;`;
            let conexion1 = conexion.ObtenerConexion("proyectoback");
            conexion1.connect();
            conexion1.query(consulta, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    try {
                        const objectArray = JSON.parse(results[0].response);
                        resolve(objectArray);
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        });
    },
    insertActividad : function (titulo, descripcion , image = null) {
        const consulta = image != null ?`INSERT INTO actividades(titulo,descripcion, image) VALUES('${titulo}','${descripcion}', '${image}')`:
            `INSERT INTO actividades(titulo,descripcion) VALUES('${titulo}','${descripcion}')`;
        let conexion1 = conexion.ObtenerConexion("proyectoback");
        conexion1.connect();
        conexion1.query(consulta);
    }
}
module.exports = actividadesHandler;


