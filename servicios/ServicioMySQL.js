const mysql = require('mysql');

let connection = null;

let servicioSQL ={
    ObtenerConexion : function(dbName){
        connection = mysql.createConnection({
        host     : 'mysql',
        user     : 'sa',
        password : 'proyecto',
        database : dbName
        });
        return connection;
    }
}

module.exports = servicioSQL;



