const conexion = require('../servicios/ServicioMySQL');
const hashing = require('../servicios/SHA512')

let authhandler = {
    validarUsuarioconToken: function(token){

    },
    validarUsuario : function(usuario, contraseña){

    },
    ingresarUsuario : function(usuario, contrasena){
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
    modficarUsuario : function(){
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