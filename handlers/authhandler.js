const conexion = require('../servicios/ServicioMySQL');
const hashing = require('../servicios/SHA512')
const {json} = require("express");
const jwt = require('jsonwebtoken');

let authhandler = {
    validarUsuarioconToken: function(token){
        try {
            const user = jwt.verify(token, process.env.TOKEN_SECRET.toString());
            return user;
        } catch (err) {
            return null; // Or you can throw an error or handle the error as needed
        }
    },
    validarUsuario : function(usuario){
        return new Promise( (resolve, reject) =>{
            let consulta = `SELECT JSON_OBJECT('usuario',usuario,'contrasena',contrasena,'rol',rol) AS userJSON from usuarios where usuario = '${usuario}' `;
            let conexion1 = conexion.ObtenerConexion("proyectoback");
            conexion1.connect();
            conexion1.query(consulta, (bad, ok) =>{
                if(bad){
                    reject(bad);
                }else{
                    try {
                        let {userJSON} = ok[0];
                        resolve(userJSON);
                    } catch (error) {
                        reject(error);
                    }
                }
            })
        });

    }
}
module.exports = authhandler;