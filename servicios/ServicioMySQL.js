const mysql      = require('mysql');

let connection = null;

let servicioSQL ={
    ObtenerConexion : function(dbName){
        connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'proyecto',
        database : dbName
        });
        return connection;
    }
}

module.exports = servicioSQL;



