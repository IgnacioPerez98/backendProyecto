const conexion = require('../servicios/ServicioMySQL');
const hashing = require('../servicios/SHA512')
const {json} = require("express");
const jwt = require('jsonwebtoken');

let authhandler = {
    validarUsuarioconToken: function(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
                if (err) {
                    return  reject(err);
                } else {
                    return resolve(user);
                }
            });
        });
    },
    validacionInternadeUsuario:function(token){
        try{
            this.validarUsuarioconToken(token).then( (data)=>{
                    return data.username;
                }
            )
        }catch (error){
            return null;
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
                        const objectArray = JSON.parse(ok[0].userJSON);
                        resolve(objectArray);
                    } catch (error) {
                        reject(error);
                    }
                }
            })
        });

    },
    ingresarUsuario : function(usuario, contrasena, tokenadmin){
        try{
            let criptedpass = hashing.cifrar(contrasena);
            let pass = {
                password : criptedpass
            }
            let consulta = `INSERT INTO usuarios(usuario, contrasena) VALUES ( '${usuario}', '${JSON.stringify(pass)}')
                            ON DUPLICATE KEY UPDATE contrasena = '${JSON.stringify(pass)}'`;
            let con = conexion.ObtenerConexion();
            con.connect();
            con.query(consulta);
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    },
    modficarUsuario : function(usuario, contrasena, tokenadmin){
        try{
            let criptedpass = hashing.cifrar(contrasena);
            let pass = {
                password : criptedpass
            }
            let consulta = `INSERT INTO usuarios(usuario, contrasena) VALUES ( '${usuario}', '${JSON.stringify(pass)}')
                            ON DUPLICATE KEY UPDATE contrasena = '${JSON.stringify(pass)}'`;
            let con = conexion.ObtenerConexion();
            con.connect();
            con.query(consulta);
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }
}
module.exports = authhandler;