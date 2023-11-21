const mysql = require('mysql2');
const enviroment = require('dotenv')

let connection = null;

//configuro dotenv
enviroment.config();


let servicioSQL ={
    ObtenerConexion : function(dbName){
        let host = process.env.BUILD==='produccion'? process.env.DBHOSTPROD: process.env.DBHOSTDEV;
        let user = process.env.BUILD==='produccion'? process.env.DBUSERPROD: process.env.DBUSERDEV;
        let puerto = process.env.DBPORT;
        connection = mysql.createConnection({
        host     : host,
        user     : user,
        port     : puerto,
        password : process.env.DBPASS,
        database : dbName
        });
        return connection;
    }
}

module.exports = servicioSQL;



