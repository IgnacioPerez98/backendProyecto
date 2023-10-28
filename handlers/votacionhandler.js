const conexion = require('../servicios/ServicioMySQL');
const hashServ = require('../servicios/SHA512');
let votacionhandler ={
    votarActividad:function (nombresala,nombreActividad,voto){
        return new Promise( (resolve, reject) =>{
                try {
                    let con = conexion.ObtenerConexion("proyectoback");
                    con.connect();
                    let consulta = `INSERT INTO votacion(actividad, voto, nombresala) VALUES ('${nombreActividad}', ${voto}, '${nombresala}');`;
                    con.query(consulta);
                    resolve({message: `La actividad ${nombreActividad}, se valoro con éxito.`});
                }catch (e) {
                    reject(e);
                }
            }
        )
    }
}
module.exports = votacionhandler;






